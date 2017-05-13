var clientDB = require('./dbclient')
var client = clientDB.client

//初始化数据
var DATABASE = 'wensentDB';
var TABLE = 'T_users';

//使用数据库名
client.query("use " + DATABASE);

var query = function(params) {
    //查询数据
    client.query(
        'SELECT * FROM ' + DATABASE + '.' + TABLE + ' WHERE id = ? and name = ? and age = ? and sex = ?',[params.id,params.name,params.age,params.sex],
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
        }
    );
};
exports.query = query;
