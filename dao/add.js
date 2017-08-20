var mysql = require("mysql")
var client = require('./dbclient').client
var poolConfig = require('./dbpool')

//连接池配置
var pool = mysql.createPool(poolConfig);

//日志系统
var logger = require('../util/log').logger
var handleSql = require('../util/loggerHandle').handleSql

//返回数据管理
var back = require('../util/back').back
var dbError = require('../util/back').dbError
var notNullError = require('../util/back').notNullError
var paramsError = require('../util/back').paramsError

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

var add = function(params, callback) {
    if ((typeof params.name != 'string') || (typeof params.sex != 'string') || (typeof params.age != 'string')) {
        callback(paramsError());
        return;
    } else {
        var addId = Date.parse(new Date()) / 1000;
        //再进行数据库表插值
        pool.getConnection(function(err, client) {
            if (err) {
                logger.debug(handleSql('INSERT INTO ' + DATABASE + '.' + TABLE + ' ' + 'SET id = ' + addId + ', name = ' + params.name + ', age = ' + params.age + ',sex = ' + params.sex));
                logger.error("ClientReady " + err);
                //释放连接  
                client.release();
                //事件驱动回调  
                callback(dbError());
            } else {
                //添加数据
                client.query(
                    'INSERT INTO ' + DATABASE + '.' + TABLE + ' ' + 'SET id = ?, name = ?, age = ?,sex = ?', [addId, params.name, params.age, params.sex],
                    function(err, results, fields) {
                        logger.debug(handleSql(handleSql('INSERT INTO ' + DATABASE + '.' + TABLE + ' ' + 'SET id = ' + addId + ', name = ' + params.name + ', age = ' + params.age + ',sex = ' + params.sex)));
                        //释放连接  
                        client.release();
                        //事件驱动回调  
                        callback(back(results));
                    });
            }
        });
    }
};

exports.add = add;