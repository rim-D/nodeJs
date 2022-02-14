/**
 ** 쿠키의 필요성
 ** 요청에는 한 가지 단점이 있음
 *  누가 요청을 보냈는지 모름(IP주소와 브라우저 정보 정도만 앎)
 *  로그인을 구현하면 됨
 *  쿠키와 세션이 필요
 * 
 *  쿠키: 키 = 값의 쌍
 *  name=jannie
 *  매 요청마다 서버에 동봉해서 보냄
 *  서버는 쿠키를 읽어 누구인지 파악
 * 
 *  writeHEad: 요청 헤더에 입력하는 메서드
 *  Set-Cookie: 브라우저에게 쿠키를 설정하라고 명령
 * 
 * http 요청과 응답은 헤더와 본문을 가짐
 * 헤더는 요청 또는 응답에 대한 정보를 가짐
 * 본문은 주고받는 실제 데이터
 * 쿠키는 부가적인 정보이므로 헤더에 저장
 * 
 * 진짜 중요한 고객 정보는 서버에 담겨있고,
 * 키값만 브라우저에 던져줘서 서버에서 정보를 가져올 수 있게금 처리
 * 중요한 정보는 세션방법을 사용하여 처리
 */
const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie': 'myCookie=test'});
    res.end('HEllO COOKIE');
})
    .listen(8083, () => {
        console.log('8083번 포트에서 서버 대기 중입니다!');
    });