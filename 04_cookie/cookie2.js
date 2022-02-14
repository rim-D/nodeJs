const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 문자열을 객체로 만들어주는 함수
const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query); // 쿼리스트링에서 name값을 추출
        const expires = new Date();
        // 쿠키 유효 시간을 현재시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            // 리다이렉트, 이 주소면 다시 이 주소로 돌려보내라
            Location: '/', // 다시 돌려주는 주소 경로 작성
            // encodeURIComponent를 안해줄 시, 한글데이터값일 경우 에러 발생!
            // Expires 쿠키의 만료기간을 작성하지 않을 경우, 브라우저를 끄는 순간 쿠키가 사라짐(세션 쿠키라고도 불리움)
            // HttpOnly 설정 시 자바스크립트에서 쿠키에 접근할 수 없습니다. 쿠키 조작을 방지하기 위해 설정하는 것이 좋습니다.
            'Set-Cookie': `name=${encodeURIComponent(
                name
            )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
        // name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
}).listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
});

/**
 *! 쿠키의 정보는 노출되고 수정되는 위험이 있음
 * 중요한 정보는 서버에서 관리하고 클라이언트에는 세션 키만 제공
 * 서버에 세션 객체(session)생성 후, uniquelnt(키)를 만들어 속성명으로 사용
 * 속성 값에 정보 저장하고 uniquelnt를 클라이언트에 보냄
 */
