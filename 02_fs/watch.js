/**
 * 파일을 감시하는 방법(변경 사항 발생 시 이벤트 호출)
 * 해당 파일 내용 변경, 파일명 변경, 파일 삭제 감지
 * 
 * change target.txt
 * rename target.txt
 */

const fs = require('fs');

fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});