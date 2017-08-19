var express = require('express');
var router = express.Router();

//处理数据库逻辑
var client = require('../dao/dbclient').client
var query = require('../dao/query').query

//日志系统
var logger = require('../util/log').logger
var handleParams = require('../util/loggerHandle').handleParams
var handleResults = require('../util/loggerHandle').handleResults

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

router.post('/getAllPeople', function(req, res) {
    logger.debug(handleParams('getData', req.body));
    query(req.body, function(data) {
        logger.debug(handleResults('getData', data));
        res.send(data);
    })
});

module.exports = router;