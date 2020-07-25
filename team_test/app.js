import express from "express"; // express 라는 함수에 require 를 통해 node js 프레임워크 express를 요청해서 대입하였음. express를 사용하기 위한 방법임.
import bodyParser from "body-parser";
import userRouter from "./router/userRouter";
import itemRouter from "./router/itemRouter";
import homeRouter from "./router/homeRouter";
import routes from "./routes";


const app = express();         // 미들웨어는 bodyParser 하나만 사용하겠습니다.
app.use(bodyParser.json());   // 사용자가 웹사이트로 전달하는 정보를 검사하는 미들웨어이다. requsest 정보에서 form 이나 json 형태로 된 body를 검사함
// app.get("view engine", "ejs");  //저희들이 준비한 DOC(Html) 형식은 pug와 맞지않아 ejs 를 사용했습니다. 

app.use(routes.home, homeRouter);
app.use(routes.items, itemRouter);   // 일단 기본적인 구성은 homeRouter(global 영역) ,userRouter(유저영역),itemRouter(물품영역) 으로 나누겠씁니다. 
app.use(routes.users, userRouter);   // Router 경로를 대표적으로 3개로 나누어서 만들었구요 경로를 가져오는 파일은 routes.js라는 객체형 파일입니다.

export default app;