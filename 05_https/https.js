/**
 * 웹 서버에 SSL 암호화를 추가하는 모듈
 *
 * 오고 가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도 내용을 확인할 수 없음
 * 요즘에는 https적용이 필수!(개인 정보가 있는 곳은 특히~!!)
 */

const https = require('https');
const fs = require('fs');

/**
 * 서버의 경우 sync 사용 하지않는 것이 좋으나
 * 서버 초기화 시, 딱 한번만 실행 시 sync 사용 가능
 */
https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
      fs.readFileSync('상위 인증서 경로'),
      fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
  .listen(443, () => { // https의 기본포트는 443
    console.log('443번 포트에서 서버 대기 중입니다!');
  });
