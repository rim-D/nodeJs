/**
 *! 쿠키의 정보는 노출되고 수정되는 위험이 있음
 * 중요한 정보는 서버에서 관리하고 클라이언트에는 세션 키만 제공
 * 서버에 세션 객체(session)생성 후, uniquelnt(키)를 만들어 속성명으로 사용
 * 속성 값에 정보 저장하고 uniquelnt를 클라이언트에 보냄
 */

const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {}; // 서버 쪽에서 데이터 저장하기 위한 객체

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now(); // 유니크한 키( = 유일한 키) 
        session[uniqueInt] = { 
            name,
            expires,
        };
        console.log(session);
        res.writeHead(302, {
            Location: '/',
            // uniqueInt -> 고유한 키값만 전달 
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
        // 세션쿠키가 존재하고, 만료 기간이 지나지 않았다면
    } else if (
        cookies.session &&
        session[cookies.session].expires > new Date()
    ) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`);
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
}).listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다!');
});
