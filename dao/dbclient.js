var mysql = require('mysql')
var dbConfig = require('./dbconfig')

//使用config中文件配置创建连接
var client = mysql.createConnection(dbConfig)

//连接数据库
client.connect(function(error, results) {
    if (error) {
        console.log('Connection Error: ' + error.message);
        return;
    }
    console.log('Connected to MySQL successfully!');
});

exports.client = client