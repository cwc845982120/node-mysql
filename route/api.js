var express = require('express');
var router = express.Router();

//解析cookie以及入参
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//处理数据库逻辑
var client = require('../dao/dbclient').client
var query = require('../dao/query').query

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

router.post('/getData', function(req, res) {
    var data = {};
    //查询数据
    client.query(
        'SELECT * FROM ' + DATABASE + '.' + TABLE,
        function selectCb(err, results, fields) {
            if (err) {
                console.log("ClientReady Error: " + error.message);
                client.end();
                data.success = false;
                res.send(data);
                return;
            }
            if (results) {
                data.success = true;
                data.result = results;
                res.send(data);
            }
        }
    );
});

module.exports = router;