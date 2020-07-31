import express from "express";// const express = require("express");
import routes from "../routes";
import mysql from "mysql2";

// import Web3 from "Web3";
// import product_contract from "'../contract/product/contract.js'"
const app = express();
// let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// let smartContract = new web3.eth.Contract(product_contract.abi, product_contract.address);

const globalRouter = express.Router();
let connection = mysql.createConnection({
    host: "192.168.0.2",
    port: 3306, // db 포트
    user: "block", // user 이름
    password: "block1234!@", // 비밀번호
    database: "team_project", // database 이름
});

// let connection = mysql.createConnection({
//     host: "192.168.0.10",
//     port: 3306, // db 포트
//     user: "blockchain", // user 이름
//     password: "blockchain3!", // 비밀번호
//     database: "team_project", // database 이름
// });


// home controller
globalRouter.get(routes.home, (req, res) => res.render("home"));


// login. controller
globalRouter.get(routes.login, (req, res) => res.render("login"));
globalRouter.get(routes.login2, (req, res) => res.render("login2"));
globalRouter.post(routes.login, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);
    connection.query(
        `SELECT * from _user_list WHERE post_id=? and password=?`,
        [email, password],
        function(err, users) {
            if ( err ) {
                console.log(err); // 오류
            } else if ( users.length > 0 ) { // users 값이 있음
                req.session.email = email;
                res.redirect(routes.login2);
            } else { // users 값이 없음 (빈 list)x
                res.render('home', { error: true, email: req.session.email });
            }
        }
    )
});
// logout controller
globalRouter.get(routes.logout, (req, res) => res.render("logout"));
globalRouter.get(routes.logout, (req, res) => {
    if (req.session.email) { // 로그인 정보가 있으면 
        req.session.destroy(function(err) {
            if ( err ) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        })
    } else {
        res.redirect('/');
    }
});

// join controller
globalRouter.get(routes.join, (req, res) => res.render("join"));
globalRouter.post(routes.join, (req, res) => { 
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    let age = null;
    if ( req.body.age ) {
        age = req.body.age
    }

    connection.query(
        `SELECT post_id from _user_list WHERE post_id=?`, // email이 같은 user의 id 찾기
        [email],
        function(err, users) {
            if ( err ) { // 오류 발생
                res.render('join', { errorMessage: "오류 발생", email: req.session.email });
                console.log("1번에러");
            } else if (users.length > 0) { // 이미 존재하는 이메일
                res.render('join', { errorMessage: "이미 존재하는 이메일", email: req.session.email });
                console.log(users.length);
            } else if(password != password2) {
                res.render("join", { errorMessage: "비밀번호가 다릅니다."});
                console.log("3번에러");
            } else if(email == "" || password == "") {
                res.render("join", { errorMessage: "공백 입력입니다"});
                console.log("4번에러");
            } else { // email이 `users` table에 없을 경우
                connection.query(
                    `INSERT INTO _user_list (post_id, password)
                        VALUES (?, ?)`,
                    [email, password],
                    function(err2, result) {
                        if ( err2 ) { // 오류 발생
                            res.render('join', { errorMessage: "생성 오류", email: req.session.email });
                            console.log("마지막에러")
                        } else { // INSERT 성공
                            res.render('home', { error: false, email: req.session.email });
                            console.log("회원가입 성공");
                        }
                    }
                );
            }
        }
    );
});


// upload controller
globalRouter.get(routes.upload, (req, res) => res.render("upload"));
globalRouter.post(routes.upload, (req,res) => {
    const itemId = req.body.itemId;
    const itemBrand = req.body.itemBrand;
    const itemPrice = req.body.itemPrice;
    let age = null;
    if ( req.body.age ) {
        age = req.body.age
    }

    connection.query(
        `SELECT post_id from _user_list WHERE post_id=?`, // email이 같은 user의 id 찾기
        [email],
        function(err, users) {
            if ( err ) { // 오류 발생
                res.render('join', { errorMessage: "오류 발생", email: req.session.email });
                console.log("1번에러");
            } else if (users.length > 0) { // 이미 존재하는 이메일
                res.render('join', { errorMessage: "이미 존재하는 이메일", email: req.session.email });
                console.log(users.length);
            } else if(password != password2) {
                res.render("join", { errorMessage: "비밀번호가 다릅니다."});
                console.log("3번에러");
            } else if(email == "" || password == "") {
                res.render("join", { errorMessage: "공백 입력입니다"});
                console.log("4번에러");
            } else { // email이 `users` table에 없을 경우
                connection.query(
                    `INSERT INTO _user_list (post_id, password)
                        VALUES (?, ?)`,
                    [email, password],
                    function(err2, result) {
                        if ( err2 ) { // 오류 발생
                            res.render('join', { errorMessage: "생성 오류", email: req.session.email });
                            console.log("마지막에러")
                        } else { // INSERT 성공
                            res.render('home', { error: false, email: req.session.email });
                            console.log("회원가입 성공");
                        }
                    }
                );
            }
        }
    );
})


// users controller
globalRouter.get(routes.users, (req, res) => res.render("users"));



export default globalRouter;