import express from "express"; // express 라는 함수에 require 를 통해 node js 프레임워크 express를 요청해서 대입하였음. express를 사용하기 위한 방법임.
import bodyParser from "body-parser";
import globalRouter from "./router/globalRouter";
import routes from "./routes";
// import Web3 from "Web3";
// import product_contract from "'../contract/product/contract.js'"

// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// var smartContract = new web3.eth.Contract(product_contract.abi, product_contract.address);

const app = express();         // 미들웨어는 bodyParser 하나만 사용하겠습니다.
app.use(bodyParser.json());   // 사용자가 웹사이트로 전달하는 정보를 검사하는 미들웨어이다. requsest 정보에서 form 이나 json 형태로 된 body를 검사함
app.set("view engine", "ejs");  //저희들이 준비한 DOC(Html) 형식은 pug와 맞지않아 ejs 를 사용했습니다. 

app.use(routes.home, globalRouter);  //라우터 경로 하나에 기능을 몰아넣었습니다.

export default app;