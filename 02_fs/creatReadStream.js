/*
    createReadStream에 인자로 파일 경로와 옵션 객체 전달
    -> 한 번에 전송하는 데이터가 64kb
    highWaterMark 옵션은 버퍼의 크기(바이트 단위, 기본값 64kb)
    data(chunk전달), end(전달완료), error(에러발생) 이벤트 리스너와 같이 사용

    비동기들은 에러를 꼭 처리해줘야함!!!!!!!

    스트림 방식은 메모리를 줄일 수 있음  
*/

const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt'); 
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 }); // 버퍼 크기 지정하여 크기별로 전송도 가능

const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', () => {
    console.log('error: ', err);
});