// node 모듈 시스템
const { odd, even } = require('./var');

// javascript 모듈 시스템
// import { odd, even } from './var';


function checkOddOrEven(num){
    if(num % 2){
        return odd;
    }
    return even;
}

// node 모듈 시스템
module.exports = checkOddOrEven;
// javascript 모듈 시스템
// export default checkOddOrEven;

/*

    ES215모듈
    자바스크립트 자체 모듈 시스템 문법이 생김
    - 아직 노드에서의 지원은 완벽하지 않음. mjs 확장자를 사용해야함
    - 크게는 require 대신 import, module.exports대신 export default를 쓰는 것으로 바뀜
    (하지만 대응이 안되는 경우도 있기 때문에 1:1 대응 안될 수 있음)

*/