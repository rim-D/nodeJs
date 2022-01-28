// const fs = require('fs');

// fs.readFile('./readme.txt', (err, data) => {
//     if(err) {
//         throw err;
//     }
//     console.log(data);
//     console.log(data.toString()); 
// });

// <- 콜백 함수 (콜벡 헬에 빠질 수 있기때문에)
//  파일시스템모듈에서는 promise를 자체 지원해줌

const fs = require('fs').promises;

fs.readFile('./readme.txt')
    .then((data)=> {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });