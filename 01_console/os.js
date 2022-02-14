const os = require('os');

// 운영체제의 정보를 담고 있음
// os는 내장모듈이라 경로 대신 이름만 적어도 됨
console.log('운영체제 정보---------------------------------')
console.log('os.arch():',os.arch()); // 아키텍처 정보
console.log('os.platform():',os.platform()); // 운영체제 플랫폼 정보
console.log('os.type():',os.type());
console.log('os.uptime():',os.uptime()); // 시작된 후 흐른시간
console.log('os.hostname():',os.hostname()); // 운영체제 이름
console.log('os.release():',os.release()); // 운영체제 버전

console.log('경로---------------------------------')
console.log('os.homedir():',os.homedir()); // 홈 디렉토리 경로
console.log('os.tmpdir():',os.tmpdir()); // 임시 파일 저장 경로

console.log('cpu 정보---------------------------------')
console.log('os.cpus():',os.cpus()); // 컴퓨터의 코어 정보
console.log('os.cpus().length:',os.cpus().length); // 컴퓨터의 코어 갯수

console.log('메모리 정보---------------------------------')
console.log('os.freemem():',os.freemem()); // 사용 가능한 메모리(RAM)
console.log('os.totalmem():',os.totalmem()); // 전체 메모리 용량