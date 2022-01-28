const fs = require('fs');

/*

    서버 시작전에는 동기로 시작해도 좋으나
    서버 시작후에는 비동기로 처리해주는 것이 좋다
    
    비동기 함수이기때문에
    실행 순서를 판단할 수가 없음
*/
fs.readFile('./readme.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('1번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('2번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('3번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('4번', data.toString());
});