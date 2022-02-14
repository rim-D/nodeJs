const express = require('express');
const path = require('path');
const app = express();

/**
 * app.set은 서버에다가 변수같은 것을 심는다는 느낌으로! port를 전역속성처럼 사용할 수 있음
 * 
 * 공통 요청하고 싶을 땐, middleware를 사용함
 * .use((req, res, next))<- 미들웨어는 next를 해줘야만 다음 것으로 서버가 넘어가짐
 * 
 * method와 주소가 있는 것을 router라고 불림
 */
app.set('port', process.env.PORT || 3000);
app.use('/category', (req, res, next) => {
    console.log('카테고리에서 실행하고 싶어요!');
    next();
});
app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요!');
    next();
});
// app.use((req, res, next) => {
//     console.log('모든 요청에 실행하고 싶어요!');
//     next();
// }, (req, res, next) => {
//    throw new Error('404'); 
// });

app.get('/', (req, res) => {
    //Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    // 여러번 send(응답)을  headers로 보냈을 경우 발생하는 에러
    //res.sendFile(path.join(__dirname, 'index.html'));
    //res.writeHead(200, {'Content-Type':'text/plain'}); // 응답보내고 난후, writeHead로 또 헤드를 보내려하면 같은 에러 발생
    //res.end('안녕하세요');
    // ^^^ 위의 방식은 node에서 실행 했을 코드


    // 아래코드가 express 전용코드
    res.setHeader('Content-Type', 'text/html');
    res.send('안녕하세요');
    //res.json({ hellow: 'coco' });

});

app.get('/', (req, res) => {
    //res.send('hello express');
    res.sendFile(path.join(__dirname, 'index.html')); // __dirname  현재 실행하는 파일의 절대경로
});
// app.get('/:hello', (req, res) => { // 와일드 카드, 정확한 용어는 라우트 매개변수 (route parameter라서 req.params)
//     //res.send('hello express');
//     res.sendFile(path.join(__dirname, 'error.html')); // __dirname  현재 실행하는 파일의 절대경로
// });
app.post('/', (req, res) => {
    res.send('hello express');
});

/**
 * category가 100개가 넘는다면 다 만들어 줄 수 없기때문에
 * 와일드 카드를 사용하여 변수를 만들어 주 잇음.
 * 정확한 용어는 라우트 매개변수(route parameter라서 req.params)로 접근 가능
 * 
 * 와일드 카드를 사용할 때는 위에서부터 아래로 실행되기때문에
 * 아래에 설정해줘야함
 */
// app.get('/category/javascript', (req, res) => {
//     res.send('hello express javascript페이지입니다');
// });
// app.get('/category/node', (req, res) => {
//     res.send('hello express node페이지입니다');
// });
// app.get('/category/react', (req, res) => {
//     res.send('hello express react페이지입니다');
// });
// app.get('/category/vue', (req, res) => {
//     res.send('hello express vue페이지입니다');
// });

app.get('/category/:name', (req, res) => {
    res.send(`hello ${req.params.name}페이지입니다`);
});
// app.get('*', (req, res) => {
//     res.send('다 처리하겠다');
// });

/**
 * 에러 미들웨어 처리 코드 작성 시,
 * parameter에 반드시 4개의 값을 다 써줘야함
 * err, rep, res, next
 */
app.use((err, rep, res, next) => {
    console.error(err);
    res.send('에러낫지롱'); // res.status(200)이 기본 설정하지 않으면 200으로 브라우저에 보여짐
});

app.use((rep, res, next) => {
    // 서버는 404여도 브라우저에게는 200이라고 보낼 수 있음
    // 500코드면 해커들이 서버 과부화 또는 공격을 할 수 있기때문에
    // 404로 통일해서 보여주던지 그러한 방식으로 보안을 유지하는 방법도 있음
    res.status(404).send('404지롱'); // res.status(http상태코드)에 따라 보냄
});




// app.listen(3000, () => {
//     console.log('익스프레스 실행');
// });
app.listen(app.get('port'), () => {
    console.log('익스프레스 실행');
});