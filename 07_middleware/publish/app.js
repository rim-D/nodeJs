const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');


const app = express();

app.set('port', process.env.PORT || 3000);

/**
 * * morgan('dev')은 
 * get요청이 왔다 응답코드, 응답하는데 걸리는 시간, 100bit를 응답했다 등의 정보를 터미널에서 보여줌
 * GET / 200 6.554 ms - 345
 * 
 * * 개발시에는
 * * morgan('dev')
 * 
 * * 배포시에는
 * * morgan('combined')
 * 조금 더 자세한 값으로 정보를 받을 수 있음
 * ip / 접속시간 / 응답 방식 / 접속 브라우저
 * ::1 - - [10/Feb/2022:05:38:30 +0000] 
 * "GET /fjfjf HTTP/1.1" 404 15 "-" 
 * "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36"
 * *app.use(expres.json());
 * Content-Type: parsing application/json
 * 클라이언트에서 json파일을 보냈을 때 json을 파싱해서 req.body로 보내줌
 * 
 * *app.use(express.urlencoded({ extended: true })); 
 * Content-Type: parsing application/x-www-form-urlencoded
 * 클라이언트에서 form으로 submit 했을 때, form 파싱, 
 * extended는 쿼리스트링을 어떻게 처리할지에 대한 것,
 * true면 qs, false면 querystring을 사용함.
 * 
 * *form에서 이미지나 file을 보내는 경우에는 multer 모듈 사용
 * *multer는
 * multipart포맷이라고 파일을 서버로 보낼 때 만드는 표준
 * 
 * *정적인 파일 보낼 때 사용
 * *app.use('요청 경로', express.static(path.join('실제경로')));
 * localhost:3000/coco.html ->  /public/coco.html 이렇게 들어가 있다고 생각하면됨 
 * localhost:3000/hello.css ->  /public/hello.css 이렇게 들어가 있다고 생각하면됨
 * 
 * 보안상 public은 쉽게 접근이 가능하기 때문에 public-3030이런식으로 변경해주는 것도 좋음!
 * !미들웨어간의 순서도 중요!!
 * 순서가 express.static마지막에 위치한다면 json , 이미지, cookie들을 무조건 파싱하게 되면 트래픽 손실이 일어남
 * morgan -> cookieParser -> session -> static까지 넣는 경우는 있음.
 * body 안넣음
*/
app.use(morgan('combined')); // 요청
app.use('/', express.static(path.join(__dirnamem, 'public')));  // 끝 -> 더이상 next 하지않음
app.use(cookieParser('cocopassword'));
app.use(session({
    resave: false, // 요청이 왔을 때 세션에 수정사항이 생기지 않아도 다시 저장할지 여부
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 저장할지
    secret: 'cocopassword',
    cookie: {
        httpOnly: true,
    },
    name: 'connect.sid'  //sessionCookie
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(multer().array());



// app.get('/',(req, res, next) => {

//     req.cookies; // { mycookie: 'test' }
//     req.signedCookies; // 암호화된 쿠키 사용할 때 씀
//     // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTSring()}; HttpOnly; path=/`
//     // encodeURIComponet 한글데이터값일 경우 에러 발생하니 꼭 ! 같이 사용
//     // set cookie
//     res.cookie('name', encodeURIComponent(name), {
//         expires: new Date(),
//         httpOnly: true,
//         path: '/'
//     })
//     // del cookie
//     res.clearCookie('name', encodeURIComponent(name), {
//         httpOnly: true,
//         path: '/'
//     })
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.get('/', (req, res, next) => {
    // req.body.name
    //req.session.id = 'hello'; // 개인의 저장 공간
    res.send('hello express');
});

app.use((req, res, next) => {
    res.status(404).send('에러낫지롱'); 
});
app.get('/category/:name', (req, res) => {
    res.send(`hello ${req.params.name}페이지입니다`);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러낫지롱'); // res.status(200)이 기본 설정하지 않으면 200으로 브라우저에 보여짐
});


app.listen(app.get('port'), () => {
    console.log('익스프레스 실행');
});