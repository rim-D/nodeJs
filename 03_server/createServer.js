/**
 * http 요청에 응답하는 노드 서버
 * 
 * rest 메서드로 응답 보내고
 * write로 응답 내용을 적고
 * end로 응답 마무리(내용을 넣어도 됨) // 응답을 거부할 수도 있음
 * 
 * listen(포트) 메서드로 특정 포트에 연결
 */
/**
 * localhost:8080으로 요청을하면
 * 프로세스를 띄우고 응답까지 받기!
 * 
 * 
 * https의 기본 포트는 443
 * ex) naver.com:433 해도 네이버에 접근 가능
 * 
 * http의 기본 포트는 80
 * ex) a-ha.io:80
 * 
 * 하나의 도메인에서 포트번호를 지정해줘서
 * 여러개의 프로그램을 하나에 연결 가능함
 * 
 * 다른 포트로 데이터베이스나 다른 서버 동시에 연결 가능
 * 
 */
const http = require('http');

const server = http.createServer((req, res) => {
    // 어떻게 응답할지에 대해~
    // html로 응답처리 해줬을 경우, 이게 문자열인지 html인지 모르는 브라우저도 발생!
    // 사파리의 경우도 모르는 브라우저 중 하나!
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); 
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello ~~~~~~~</p>');
})

    // .listen(8080, () => {
    //     console.log('8080번 포트에 서버 대기 중입니다.');
    // });

    .listen(80);


/**
 * sever도 비동기이기때문에 항상 에러처리!
 */
server.on('listening', () => {
    console.log('80번 포트에 서버 대기 중입니다.');
    // listen에 대한 콜백을 listening에 빼서 작성 가능!
});
server.on('error', (error) => {
    console.error(error);
});



/**
 * 
 *  이론 상으로 server 여러대 만들 수 있음
 * 
 */
const server1 = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); 
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server1</p>');
    res.write('<p>Hello ~~~~~~~</p>');
})
    .listen(81);

server1.on('listening', () => {
    console.log('81번 포트에 서버 대기 중입니다.');
});
server1.on('error', (error) => {
    console.error(error);
});