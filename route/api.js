var express = require('express');
var router = express.Router();

//处理数据库逻辑
var client = require('../dao/dbclient').client
var query = require('../dao/query').query
var add = require('../dao/add').add
var deleteRows = require('../dao/delete').deleteRows

//日志系统
var logger = require('../util/log').logger
var handleParams = require('../util/loggerHandle').handleParams
var handleResults = require('../util/loggerHandle').handleResults

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

//查询people列表
router.post('/queryPeople', function(req, res) {
    logger.debug(handleParams('queryPeople', req.body));
    query(req.body, function(data) {
        logger.debug(handleResults('queryPeople', data));
        res.send(data);
    })
});

//添加people
router.post('/addPeople', function(req, res) {
    logger.debug(handleParams('addPeople', req.body));
    add(req.body, function(data) {
        logger.debug(handleResults('addPeople', data));
        res.send(data);
    })
});

//删除people
router.post('/deletePeople', function(req, res) {
    logger.debug(handleParams('deletePeople', req.body));
    deleteRows(req.body, function(data) {
        logger.debug(handleResults('deletePeople', data));
        res.send(data);
    })
});

//修改people
router.post('/updatePeople', function(req, res) {
    logger.debug(handleParams('updatePeople', req.body));
    add(req.body, function(data) {
        logger.debug(handleResults('updatePeople', data));
        res.send(data);
    })
});

module.exports = router;