var express = require('express');
var router = express.Router();

//处理数据库逻辑
var client = require('../dao/dbclient').client
var query = require('../dao/query').query

//日志系统
var logger = require('../log/log').logger
var handleParams = require('../util/loggerHandle').handleParams
var handleResults = require('../util/loggerHandle').handleResults
var handleSql = require('../util/loggerHandle').handleSql

//返回数据管理
var back = require('../util/back').back
var dbError = require('../util/back').dbError

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

router.post('/getData', function(req, res) {
    logger.debug(handleParams('getData', req.body));
    //查询数据
    client.query(
        'SELECT * FROM ' + DATABASE + '.' + TABLE,
        function selectCb(err, results, fields) {
            if (err) {
                client.end();
                logger.debug(handleSql('getData', 'SELECT * FROM ' + DATABASE + '.' + TABLE));
                logger.error("ClientReady Error: " + error.message);
                res.send(dbError());
                return;
            }
            if (results) {
                back(results);
                logger.debug(handleSql('getData', 'SELECT * FROM ' + DATABASE + '.' + TABLE));
                logger.debug(handleResults('getData', back(results)));
                res.send(back(results));
            }
        }
    );
});

module.exports = router;