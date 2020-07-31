// home(global)
const home = "/";
const login = "/login";
const login2 = "/login/:id"
const logout = "/logout";
const join = "/join";
const upload = "/upload"; 
const users = "/users" //mypage 와 같은 유저 정보와 등록리스트를 볼수있는 페이지 

const routes = {
    home : home,
    login : login,
    login2 : login2,
    logout : logout,
    join : join,
    upload : upload,
    users : users,
}

export default routes;  //app.js로 보내기위해서 상수 routes 에 객채형 스트링타입을 넣어서 만들었습니다.