/**
 * 노드 비동기 메서드의 에러는 따로 처리하지 않아도 됨
 * 콜백 함수에서 에러 객체 제공
 * 
 * 제공 하지 않을 경우는 try~catch문 사용
 */

const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdefg.js', (err) => {
        if(err) {
            // err 객체 제공하는 경우는 서비스가 멈추지는 않음
            console.error(err); // 로그를 보고 에러를 해결 할 수 있음
        }
    });
}, 1000);