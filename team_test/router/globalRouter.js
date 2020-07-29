import express from "express";// const express = require("express");
import routes from "../routes";
// import Web3 from "Web3";
// import product_contract from "'../contract/product/contract.js'"

// let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// let smartContract = new web3.eth.Contract(product_contract.abi, product_contract.address);

const globalRouter = express.Router();

// home controller
globalRouter.get(routes.home, (req, res) => res.render("home", {title:"home"}));


// login. controller
globalRouter.get(routes.login, (req, res) => res.render("login"));
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


// join controller
globalRouter.get(routes.join, (req, res) => res.render("join"));


// upload controller
globalRouter.get(routes.upload, (req, res) => res.render("upload"));


// users controller
globalRouter.get(routes.users, (req, res) => res.render("users"));



export default globalRouter;