/*
    from(문자열) 
    문자열을 버퍼로 바꿀 수 있음. 
    length 속성은 버퍼의 크기를 알려줌. 바이트 단위

    toString(버퍼)
    버퍼를 다시 문자열로 바꿀 수 있음.
    이때 base64나 hex를 인자로 넣으면 해당 인코딩으로도 변환 가능

    concat(배열)
    배열 안에 든 버퍼들을 하나로 합침

    alloc(바이트)
    빈 버퍼 생성.
    바이트를 인자로 지정해주면 해당 크기의 버퍼 생성
*/

const buffer = Buffer.from('저를 버퍼로 바꿔보세요.');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
console.log(array);
console.log(Buffer.concat(array).toString());

console.log(Buffer.alloc(5)); // 아무것도 없는 5bite의 버퍼 전송하는 경우에 사용

