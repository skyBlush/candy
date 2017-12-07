// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
// "use strict";
const models = require('./db');
// const promodels = require('./dbto')
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/register/createAccount',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    models.loginSchema.find({username:req.body.username},(err,docs)=>{
        var result={
            code:1
        }
        if (docs.length>0) {
            result.code=-100;
            result.message = '用户名已存在';
            res.send(JSON.stringify(result));
            return;
        }
        let newAccount = new models.loginSchema({
            username : req.body.username,
            pw : req.body.pw ,
            em : req.body.em
        });
        // 保存数据newAccount数据进mongoDB
        newAccount.username = req.body.username;
        newAccount.pw = req.body.pw;
        newAccount.em = req.body.em;
        newAccount.save((err,data) => {
            if (err) {
                result.code=-101;
                result.message = '注册失败';
                res.send(JSON.stringify(result));
            }
                result.message = '注册成功';
                res.send(JSON.stringify(result));
        });
        // res.send(JSON.stringify(result));
    })
});
// 获取已有账号接口
router.post('/api/login/getAccount',(req,res) => {
    // 通过模型去查找数据库
    models.loginSchema.find({username:req.body.username,pw:req.body.pw},(err,data) => {
        console.log(req.body.username)
        var result = {
                code:1
            };
        if (err||data.length===0) {          
            result.code = -200;
            result.message = '登录失败'
            res.send(JSON.stringify(result));
        } else {
            result.message = '登录成功';
            res.send(JSON.stringify(result));
        }
    });
});
router.post('/api/login/createProduct',(req,res)=>{
    console.log(req.body.name)
    var result={
            code:1
        }
    let newAccount = new models.productSchema({
            name : req.body.name,
            price : req.body.price ,
        });
        // 保存数据newAccount数据进mongoDB
        newAccount.name = req.body.name;
        newAccount.price = req.body.price;
        newAccount.flag = 0;
        newAccount.id = req.body._id;
        newAccount.save((err,data) => {
            if (err||data.length===0) {
                result.code=-101;
                result.message = '提交失败';
                res.send(JSON.stringify(result));
            }
                result.message = '提交成功';
                res.send(JSON.stringify(result));
        });
})
router.post('/api/login/shop',(req,res)=>{
    models.productSchema.find({flag:0},(err,data)=>{
        var result={
            code:1
        };
        if (err||data.length===0) {
            result.code=-301;
            result.message = '不能查询到您的信息'
            // res.send(JSON.stringify(result))
        }else{
            result.message = '查询成功'
            result.data = data;
            // console.log(result)         
        }

    res.send(JSON.stringify(result))
    })
})
router.post('/api/login/del',(req,res)=>{
    models.productSchema.update({_id:req.body.id},{flag:1},(err,data)=>{
        console.log(req.body.id)
        var result={
            code:1
        };
        if (err) {
            result.code=-302;
            result.message = '删除错误'
            // res.send(JSON.stringify(result))
        }else{
            result.message = '删除成功'
            result.data = data;
            // console.log(result)         
        }

    res.send(JSON.stringify(result))
    })
})
module.exports = router;