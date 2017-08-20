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

var query = function(params, callback) {
    if (params.id) {
        pool.getConnection(function(err, client) {
            if (err) {
                logger.debug(handleSql('SELECT * FROM ' + DATABASE + '.' + TABLE));
                logger.error("ClientReady " + err);
                //释放连接  
                client.release();
                //事件驱动回调  
                callback(dbError());
            } else {
                //查询数据
                client.query(
                    'SELECT * FROM ' + DATABASE + '.' + TABLE + ' WHERE id = ?', [params.id],
                    function(err, results, fields) {
                        logger.debug(handleSql('SELECT * FROM ' + DATABASE + '.' + TABLE + ' WHERE id = ' + params.id));
                        //释放连接  
                        client.release();
                        //事件驱动回调  
                        callback(back(results));
                    });
            }
        });
    } else {
        pool.getConnection(function(err, client) {
            if (err) {
                logger.debug(handleSql('SELECT * FROM ' + DATABASE + '.' + TABLE));
                logger.error("ClientReady " + err);
                //释放连接  
                client.release();
                //事件驱动回调  
                callback(dbError());
            } else {
                //查询数据
                client.query(
                    'SELECT * FROM ' + DATABASE + '.' + TABLE,
                    function(err, results, fields) {
                        logger.debug(handleSql('SELECT * FROM ' + DATABASE + '.' + TABLE));
                        //释放连接  
                        client.release();
                        //事件驱动回调  
                        callback(back(results));
                    });
            }
        });
    }

};

exports.query = query;