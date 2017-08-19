#!/bin/node

var express = require('express')
var ejs = require('ejs')
var path = require('path')

//解析cookie以及入参
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//路由
var api = require('../route/api')

//端口配置
var PORT = process.env.PORT || 8081;
var app = express();

//跨域设置请求头
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//设置页面加载引擎
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//请求部分
//路由逻辑分配
app.use('/api', api);

//渲染首页
app.get('/', function(req, res) {
    res.render('./index.html');
})

//监听端口
app.listen(PORT, function(res, req) {
    console.log(`server is work on ${PORT}`);
})