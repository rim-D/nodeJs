/*
    메모리 체크하기

    버퍼 방식과 스트림 방식 메모리 사용량을 비교
*/

const fs = require('fs');
console.log('before: ', process.memoryUsage().rss); // 1945600 19MB

const data1 = fs.createReadStream('./big.txt');
fs.createWriteStream('./big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss); //20492288 20MB

