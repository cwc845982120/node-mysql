var clientDB = require('./dbclient')
var client = clientDB.client

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

//添加数据
var VALUES = ['3', '小明', '22', '男'];
client.query(
    //INSERT INTO `cwcdb`.`person` (`id`, `name`, `age`) VALUES ('1', '曹文成', '22');
    'INSERT INTO ' + TEST_DATABASE + '.' + TEST_TABLE + ' ' + 'SET id = ?, name = ?, age = ?,sex = ?', VALUES
);
