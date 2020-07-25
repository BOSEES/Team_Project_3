// home(global)
const home = "/";
const login = "/login";
const logout = "/logout";
const search = "/search";
const join = "/join";


//item
const items = "/items";
const uproadItems = "/uproadItems";
const deleteItems = "/:id/deleteItems";
const itemDetail = "/:id/itemDetail";   //:id <--- 이건 express에서 라우팅 경로를 매개변수처럼 사용자의 INPUT 값에 따라 변하는 경로를 지정할때 쓰는 방법입니다.
const editItems = "/:id/edit"           

// users
const users = "/users"
const userDetail = "/:id";
const userPofile = "/userProfile";
const changePassword = "/changePassword";


const routes = {
    // home(Global)
    home : home,
    login : login,
    logout : logout,
    search : search,
    join : join,
    
    // item
    items : items,
    uproadItems : uproadItems,
    itemDetail : itemDetail,      //위에다 정의 해놓은 상수들을 객채형 타입으로 라우팅하기위해서 만들었습니다. key : value 의 콜라보
    deleteItems : deleteItems,
    editItems : editItems,

    // user
    users : users,
    userDetail : userDetail,
    userPofile  : userPofile,
    changePassword : changePassword,
}

export default routes;  //app.js로 보내기위해서 상수 routes 에 객채형 스트링타입을 넣어서 만들었습니다.