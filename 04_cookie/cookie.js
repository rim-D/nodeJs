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