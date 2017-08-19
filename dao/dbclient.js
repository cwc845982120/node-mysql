var mysql = require('mysql')
var dbConfig = require('./dbconfig')

var client;
var timer;

function handleError(err) {
    if (err) {
        // 如果是连接断开，自动重新连接  
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            //如果数据库连接不上 没歌10s重连一次
            timer = setInterval(function() {
                connect();
            }, 10000)
        } else {
            console.error(err.stack || err);
        }
    } else {
        clearInterval(timer);
        console.log('Connected to MySQL successfully!');
    }
}

// 连接数据库  
function connect() {
    //使用config中文件配置创建连接
    client = mysql.createConnection(dbConfig)
    client.connect(handleError);
    client.on('error', handleError);
}

connect();

exports.client = client