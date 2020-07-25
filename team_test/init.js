import app from "./app";
//app.js 를 require 한다는 단순한 구조입니다. ECMASCRPIT6(ES6)에서 생긴 새로운 문법?입니다
// const app = require("./app") 와 같은 구조입니다. 요즘은 var 을 안쓰는 추세입니다. 기본적으로 상수 const 와 변수 let 을 많이 씁니다.

const port = 3333; // 우리의 포트번호 3조 3조 3조 3조 = 3333;
const teamProject = () => console.log(`Team Project listening : http://localhost:${port}`);
// ECMASCRIPT6(ES6) 새로운 함수 문법 arrow function 을 이용해서 작성할려고합니다. 훨씬
//간결하고 시인성이 좋은것같네요.
//Vanilla JS 문법으로 (순수 자쓰 문법)으로 고쳐보자면 흐음...
// const teamProject = function(){ 
//    console.log(`Team Project listening : http://localhost:${port}` );
// }

app.listen(port,teamProject);  //이건 뭐 그냥 설명 안하겠습니다.