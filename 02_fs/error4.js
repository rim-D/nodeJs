/**
 * 노드 공식 문서에서 모든 error가 콜백 함수의 동작이 보장되지 않음
 * 따라서 복구 작업용으로 쓰는 것은 부적합
 * 에러 내용 기록 용으로만 쓰는게 좋음
 */
process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err); // 복구 코드는 여기에다가 작성 하면 안됨 - 노드가 모든 걸 보장하지 않기때문에
});

setInterval(() => {
    throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다.');
}, 2000);

/**
 * 
 * 윈도(콘솔)
 * 어떤 포트를 사용하고 있는지 
 * netstat -ano | findstr 포트
 * taskkill /pid 프로세스 아이디 /f
 * 
 */

/**
 * 
 * 맥/리눅스(콘솔)
 * lsof -i  tcp:포트
 * kill -9 프로세스아이디
 * 
 */
