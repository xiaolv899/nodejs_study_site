/**
 * Created by Administrator on 2015/6/10.
 */
var mssql = require('mssql');
var config = {
    user: 'sa',
    password: 'sql@123',
    server: '192.168.2.199', // You can use 'localhost\\instance' to connect to named instance
    database: 'testing',

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

function execute(sql, callback){
    //虚拟数据
    /*if(sql.indexOf('[users]')!=-1)
        callback(null,{
            data:[{
            'name':'admin',
            'password':'123'}]
        });
    else if(sql.indexOf('update')!=-1||sql.indexOf('insert')!=-1||sql.indexOf('delete')!=-1)
        callback(null,{
            isSuccess : true,
            data: { }
        });
    else if(sql.indexOf('[products]')!=-1&&sql.indexOf('[id]')!=-1)
        callback(null,{
            data: { 'id':1, 'name':'产品1', 'image':'http://img.1caifu.com/Upload/Company/Logo/20150421/2015042120083626639948.jpg', 'des':'说明1'}
        });
    else if(sql.indexOf('[products]')!=-1)
        callback(null,{
            totalcount:100,
            data: [
                { 'id':1, 'name':'产品1', 'image':'http://img.1caifu.com/Upload/Company/Logo/20150421/2015042120083626639948.jpg', 'des':'说明1'},
                { 'id':2, 'name':'产品1', 'image':'http://img.1caifu.com/Upload/Company/Logo/20150421/2015042120084035052816.jpg', 'des':'说明1'},
                { 'id':3, 'name':'产品1', 'image':'http://img.1caifu.com/Upload/Company/Logo/20150421/2015042120084406458226.jpg', 'des':'说明1'},
                { 'id':4, 'name':'产品1', 'image':'http://img.1caifu.com/Upload/Company/Logo/20150421/2015042120084916724159.jpg', 'des':'说明1'},
                { 'id':5, 'name':'产品1', 'image':'http://img.1caifu.com/Upload/Company/Logo/20150421/2015042120084101855151.jpg', 'des':'说明1'}
            ]});
    return;*/

    var connection = new mssql.Connection(config, function(err) {
        console.log(sql);
        if(err) {
            console.log(err);
            callback(err);
            return;
        }
        var request = new mssql.Request(connection); // or: var request = connection.request();
        request.query(sql, function(err,recordset){
            callback(err,{
                data: recordset
            });
        });
        //connection.close();
    });
}
function getFieldValue(val) {
    if (typeof val === 'string') {
        return "'" + val + "'";
    }else if(typeof val === 'number'){
        return "" + val + "";
    }else{
        return "'" + (val||"") + "'";
    }
}

exports.query = function(sql,callback){
    execute(sql, callback);
};
exports.insert = function(data, callback){
    var insert1 = "";
    var insert2 = "";
    for(var k in data){
        insert1+=",["+k+"]";
        insert2+=","+getFieldValue(data[k]);
    }
    var sql = "insert into [products]("+insert1.substr(1)+") values("+insert2.substr(1)+")";
    execute(sql, callback);
}