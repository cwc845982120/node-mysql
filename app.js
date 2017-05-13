var express = require('express')
var ejs = require('ejs')
var path = require('path')
var clientDB = require('./dao/dbclient')
var query = require('./dao/query').query
var client = clientDB.client

var PORT = process.env.PORT || 8080;
var app = express();

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static('src'))

app.get('/', function(req, res) {
    res.render('./index.html');
})

//获取数据
app.get('/api/getData', function(req, res) {
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
                for (var i = 0; i < results.length; i++) {
                    console.log("%d\t%s\t%s\t%s", results[i].id, results[i].name, results[i].age, results[i].sex);
                }
                data.success = true;
                data.result = results;
                res.send(data);
            }
            //client.end();
            //console.log('Connection closed');
        }
    );
})

app.listen(PORT, function(res, req) {
    console.log(`server is work on ${PORT}`);
})
