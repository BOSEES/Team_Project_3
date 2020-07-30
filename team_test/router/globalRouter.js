import express from "express";// const express = require("express");
import routes from "../routes";
import mysql from "mysql2";
// import Web3 from "Web3";
// import product_contract from "'../contract/product/contract.js'"

// let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// let smartContract = new web3.eth.Contract(product_contract.abi, product_contract.address);

const globalRouter = express.Router();
let connection = mysql.createConnection({
    host: "192.168.0.3",
    port: 3306, // db 포트
    user: "block", // user 이름
    password: "block1234!@", // 비밀번호
    database: "team_project", // database 이름
});


// home controller
globalRouter.get(routes.home, (req, res) => res.render("home"));


// login. controller
globalRouter.get(routes.login, (req, res) => res.render("login"));
globalRouter.post(routes.login, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    connection.query(
        `SELECT * from users WHERE email=? and password=?`,
        [email, password],
        function(err, users) {
            if ( err ) {
                console.log(err); // 오류
            } else if ( users.length > 0 ) { // users 값이 있음
                req.session.email = email;
                res.redirect('/');
            } else { // users 값이 없음 (빈 list)
                res.render('login', { error: true, email: req.session.email });
            }
        }
    )
});
// globalRouter.post(routes.login, (req, res) => {
//     web3.eth.getAccounts().then(function (accounts) {
//         var i;
//         for (i = 0; i < accounts.length; i++) {
//             if (req.body.eth_account == accounts[i]) {
//                 req.session.account = req.body.eth_account;
//                 res.render('loginProcess', { title: "login....", eth_account: req.body.eth_account });
//             }
//         }
//         try{
//             if (i == accounts.length) {
//             res.redirect('/login');
//         }
//         }catch(e){
//             console.log(e)
//         }
// });

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
    var age = null;
    if ( req.body.age ) {
        age = req.body.age
    }

    connection.query(
        `SELECT id from users WHERE email=?`, // email이 같은 user의 id 찾기
        [email],
        function(err, users) {
            if ( err ) { // 오류 발생
                res.render('signup', { errorMessage: "오류 발생", email: req.session.email });
            } else if (users.length > 0) { // 이미 존재하는 이메일
                res.render('signup', { errorMessage: "이미 존재하는 이메일", email: req.session.email });
            } else { // email이 `users` table에 없을 경우
                connection.query(
                    `INSERT INTO users (email, password, age)
                        VALUES (?, ?, ?)`,
                    [email, password, age],
                    function(err2, result) {
                        if ( err2 ) { // 오류 발생
                            res.render('signup', { errorMessage: "생성 오류", email: req.session.email });
                        } else { // INSERT 성공
                            res.render('login', { error: false, email: req.session.email });
                        }
                    }
                );
            }
        }
    );
});


// upload controller
globalRouter.get(routes.upload, (req, res) => res.render("upload"));


// users controller
globalRouter.get(routes.users, (req, res) => res.render("users"));



export default globalRouter;