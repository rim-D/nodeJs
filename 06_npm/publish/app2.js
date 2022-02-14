const express = require('express');
const { restart } = require('nodemon');
const path = require('path');
const app = express();


app.set('port', process.env.PORT || 3000);
app.use('/category', (req, res, next) => {
    console.log('카테고리에서 실행하고 싶어요!');
    next();
});
// app.use((req, res, next) => {
//     console.log('모든 요청에 실행하고 싶어요!');
//     next();
// }, (req, res, next) => {
//     // throw new Error('에러이지요'); //<- 대놓고 에러 처리하기보다는
//     try {
//         console.lo('모든 요청에 실행하고 싶어요!');
//     } catch(error) {
//         next(error); // <- error(인수)가 들어 갔으면 error처리 미들웨어로 이동하게 됨
//     }
// });

// app.get('/', (req, res) => {
//     // res.json하면 알아서 'Content-Type':'application/plain'으로 넣어줌
//     res.json({ hello : 'coco' }); // res.json은 return이 아님 응답을 보낼뿐
//     console.log('hello coco'); // return이 아니기에 console.log까지 실행됨
// });


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));

    if (true) {
        next('route'); // 다음 route를 보라는 의미  
    } else {
        next(); // false면 바로 다음 route가 실행됨
    }
    
}, (req, res) => { // false일 경우 실행되는 코드
    console.log('실행되나요?');
});

// 다음 route
app.get('/', (req, res, next) => {
    console.log('실행되지요');
});



app.use((rep, res, next) => {
    // 서버는 404여도 브라우저에게는 200이라고 보낼 수 있음
    // 500코드면 해커들이 서버 과부화 또는 공격을 할 수 있기때문에
    // 404로 통일해서 보여주던지 그러한 방식으로 보안을 유지하는 방법도 있음
    res.status(404).send('404지롱'); // res.status(http상태코드)에 따라 보냄
});



// 에러미들웨어에서 err는 모두 처리됨
app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('에러 났지요~~~!! 근데 안알려주지롱~~')
});


app.listen(app.get('port'), () => {
    console.log('익스프레스 실행');
});