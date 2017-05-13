var clientDB = require('./dbclient')
var client = clientDB.client

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

//删除数据
var VALUES = ['2'];
client.query(
    //DELETE FROM `cwcdb`.`person` WHERE `id`='2';
    'DELETE FROM ' + TEST_DATABASE + '.' + TEST_TABLE + ' ' + 'WHERE id = ?', VALUES
);
