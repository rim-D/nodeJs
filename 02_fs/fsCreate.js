const fs = require('fs').promises;
const constants = require('fs').constants;

/*
    fs.access(경로, 옵션, 콜백)
    폴더나 파일에 접근할 수 있는지를 체크.
    
    F_OK 파일 존재여부
    R_OK 읽기 권한 여부
    W_OK 쓰기 권한 여부 체크

    파일 / 폴더나 권한이 없다면 에러가 발생
    파일 / 폴더가 없을 때의 에러 코드는 ENOENT

    fs.mkdir(경로, 콜백)
    폴더를 만드는 메서드
    이미 폴더가 있다면 에러발생하기 때문에
    access()메서드를 호출해서 확인하는 것이 중요!

    fs.open(경로, 옵션, 콜백)
    파일의 아이디(fd변수)를 가져오는 메서드
    파일이 없다면 파일을 생성한 뒤 그 아이디를 가져옴.
    가져온 아이디를 사용해 fs.read(), fs.write()로 읽거나 쓸 수 있음.

    쓰려면 w
    읽으려면 r
    기존 파일에 추가하려면 a

    fs.rename(기존 경로, 새 경로, 콜백)
    파일의 이름을 바꾸는 메서드
    기존파일 위치와 새로운 파일 위치리를 적어주면 됨
    반드시 같은 폴더를 지정할 필요는 없으므로 잘라내기 같은 기능을 할 수 있음
*/

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK) // 폴더가 있고 없고를 판단
    .then(() => {
        return Promise.reject('이미 폴더 있음');
    })
    .catch((err) => {
        if(err.code === 'ENOENT'){ // error가 없으면 folder를 만들어줘라
            console.log('폴더 없음');
            return fs.mkdir('./folder');
        }  
        return Promise.reject(err);
    })
    .then(() => {
        console.log('폴더 만들기 성공');
        return fs.open('./folder/file.js', 'w');
    })
    .then((fd) => {
        console.log('빈 파일 만들기 성공', fd);
        fs.rename('./folder/file.js','./folder/newfile.js'); // 파일 이름 바꾸기
    })
    .then(() => {
        console.log('이름 바꾸기 성공');
    })
    .catch((err) => {
        console.error(err);
    });