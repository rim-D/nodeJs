/*
    스트림 사이에 pipe사용
    pipe로 여러 개의 스트림을 이을 수 있음

*/

// 스트림을 이용해서 파일을 복사하는 예제
const fs = require('fs');
const zlib = require('zlib'); // 파일 압축해서 사용

const readStream = fs.createReadStream('readme3.txt', { highWaterMark: 16 });
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(zlibStream).pipe(writeStream);
