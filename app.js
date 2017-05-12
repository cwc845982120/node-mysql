var mysql = require('mysql');
var dbConfig = require('./dbConfig');

//初始化数据
var UPDATE = false;
var DELETE = false;
var ADD = false;

var TEST_DATABASE = 'wensentDB';
var TEST_TABLE = 'T_wensent';

//使用config中文件配置创建连接
var client = mysql.createConnection(dbConfig);

//连接数据库
client.connect(function(error, results) {
    if (error) {
        console.log('Connection Error: ' + error.message);
        return;
    }
    console.log('Connected to MySQL successfully!');
});

//使用数据库名
client.query("use " + TEST_DATABASE);

//添加数据
if (ADD) {
    var VALUES = ['3', '小明', '22', '男'];
    client.query(
        //INSERT INTO `cwcdb`.`person` (`id`, `name`, `age`) VALUES ('1', '曹文成', '22');
        'INSERT INTO ' + TEST_DATABASE + '.' + TEST_TABLE + ' ' + 'SET id = ?, name = ?, age = ?,sex = ?', VALUES
    );
}


//删除数据
if (DELETE) {
    var VALUES = ['2'];
    client.query(
        //DELETE FROM `cwcdb`.`person` WHERE `id`='2';
        'DELETE FROM ' + TEST_DATABASE + '.' + TEST_TABLE + ' ' + 'WHERE id = ?', VALUES
    );
}


//修改数据
if (UPDATE) {
    var VALUES = ['小李', '3'];
    client.query(
        //UPDATE `cwcdb`.`person` SET `name`='小李' WHERE `id`='2';
        'UPDATE ' + TEST_DATABASE + '.' + TEST_TABLE + ' ' + 'SET name = ? WHERE id = ?', VALUES
    );
};


//查询数据
client.query(
    //SELECT * FROM cwcdb.person;
    'SELECT * FROM ' + TEST_DATABASE + '.' + TEST_TABLE,
    function selectCb(err, results, fields) {
        if (err) {
            console.log("ClientReady Error: " + error.message);
            client.end();
            console.log('Connection closed');
            return;
        }
        if (results) {
            for (var i = 0; i < results.length; i++) {
                console.log("%d\t%s\t%s\t%s", results[i].id, results[i].name, results[i].age, results[i].sex);
            }
        }
        client.end();
        console.log('Connection closed');
    }
);
