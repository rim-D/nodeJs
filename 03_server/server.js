
const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async(req, res) => {
    try {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); 
        const data = await fs.readFile('./server.html');
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); // 일반문자열
        res.end(err.message);
    };
   

})

    // .listen(8080, () => {
    //     console.log('8080번 포트에 서버 대기 중입니다.');
    // });

    .listen(8081);


/**
 * sever도 비동기이기때문에 항상 에러처리!
 */
server.on('listening', () => {
    console.log('8081번 포트에 서버 대기 중입니다.');
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
    .listen(8082);

server1.on('listening', () => {
    console.log('8082번 포트에 서버 대기 중입니다.');
});
server1.on('error', (error) => {
    console.error(error);
});

/**
 ** REST API(Representational State Transfer)
 * 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
 * /user이면 사용자 정보에 관한 정보를 요청하는 것
 * /post면 게시글에 관련된 자원을 요청하는 것
 * 
 ** HTTP 요처 메서드
 * GET 서버 자원을 가져오려고 할 때 사용
 * POST 서버에 자원을 새로 등록하고자 할 때 사용(또는 뭘 써야할 지 애매할 때)
 * PUT 서버의 자원을 요청에 들어있는 자원으로 치환하고자할 때 사용
 * PATCH 서버 자원의 일부만 수정하고자 할 때 사용
 * DELETE 서버의 자원을 삭제하고자 할 때 사용
 * 
 ** HTTP 프로토콜
 * 클라이언트가 누구든 서버와 HTTP프로토콜로 소통가능
 * ios, 안드로이드, 웹이 모두 같은 주소로 요청 보낼 수 있음
 * 서버와 클라이언트의 분리
 * 
 ** RESTful
 * REST API를 사용한 주소 체계를 이용하는 서버
 * GET / user는 사용자를 조회하는 요청, POST /user는 사용자를 등록하는 요청
 ** 서버 주소 구조 
 * GET      /                   restFront.html 파일 제공
 * GET      /about              about.html 파일 제공
 * GET      /users              사용자 목록 제공    
 * GET      기타                기타 정적 파일 제공
 * POST     /users              사용자 등록
 * PUT      /users/사용자id     해당 id의 사용자 수정
 * DELETE   /users/사용자id     해당 id의 사용자 제거
 * 
 */