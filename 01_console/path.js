const path = require('path');

/*
    운영체제별로 분기처리하지않고
    폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
    운영체제별로 경로 구분자가 다름(Windows: '\', POSIX: '/') 

    c:\user\name <- windows
    c:/user/name <- posix(mac, relux)
*/

console.log(path.join(__dirname,'var.js')); // C:\Users\DEV-775\Desktop\Study\nodeJs\01_console\var.js

// 부모 코드로 올라가는 경우
console.log(path.join(__dirname,'..','var.js'));  // C:\Users\DEV-775\Desktop\Study\nodeJs\var.js

console.log('join과 resolve 차이---------------------------');
console.log(path.join(__dirname,'..','/var.js')); // C:\Users\DEV-775\Desktop\Study\nodeJs\var.js
console.log(path.resolve(__dirname,'..','/var.js')); // C:\var.js


console.log('------------------------------------------------------');
const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('------------------------------------------------------');
console.log('path.dirnmae():', path.dirname(string)); // 경로 이름
console.log('path.extname():', path.extname(string)); // 확장자명 .js 
console.log('path.basename():', path.basename(string)); // 파일명 path
console.log('path.basename() - extnmae:', path.basename(string, path.extname(string)));
console.log('------------------------------------------------------');
console.log('path.parse():', path.parse(string));
console.log('path.format():', path.format({
    dir: 'C:\Users\DEV-775',
    name: 'path',
    ext: '.js',
}));
console.log('path.normalize():', path.normalize('C:\UsersDEV-775/\\path.js'));
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();