import express from "express"; // const express = require("express");
import routes from "../routes"; // get() 메소드를 이용해 데이터를 보여줄려면 아무래도 routes.js 에 작성해놓은 스트링타입 객채형 파일을 가져와서
                                //그 함수들을 사용하는게 편하다고 생각되어 사용했습니다. 역시 모듈화를 하니 코드의 재사용 효율이 좋아지는듯 합니다.
import {users, Profile, Detail, changePassword} from "../controller/usersController";
 // 쪼갤수있는데 까지 쪼개봅니다.
//이  import {어쩌구,저쩌구} 는 export default가 아닌 상수에 직접 export 했을때 사용하는 유일한 단일 url 라우팅 방법입니다.
//이렇게 하면 재미있는게 지정한 라우트 경로에 있는 함수은 눈정화 할수있을정도로 깔끔해집니다. 그냥 if문이나 for문 등등 채워넣기만 하믄 됨

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.userPofile, Profile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, Detail);

export default userRouter;