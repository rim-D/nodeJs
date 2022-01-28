const fs = require('fs');

/*

    한번만 실행하거나
    서버 초기화 작업을 할 때 그런 경우에 사용하게 됨
    사용자가 많을 수록 끝 작업자는 늦게 사용하게 되는 단점이 있음

*/
let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());

data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());

data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());

data = fs.readFileSync('./readme.txt');
console.log('4번', data.toString());
