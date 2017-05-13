var clientDB = require('./dbclient')
var client = clientDB.client

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

//修改数据
var VALUES = ['小李', '3'];
client.query(
    //UPDATE `cwcdb`.`person` SET `name`='小李' WHERE `id`='2';
    'UPDATE ' + TEST_DATABASE + '.' + TEST_TABLE + ' ' + 'SET name = ? WHERE id = ?', VALUES
);