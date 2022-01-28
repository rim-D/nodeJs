/*
    메모리 체크하기

    버퍼 방식과 스트림 방식 메모리 사용량을 비교
*/

const fs = require('fs');
console.log('before: ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt'); // 19468288 19MB
fs.writeFileSync('./big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss); // 1025495040 1GB