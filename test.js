/**
 * Created by Administrator on 2015/6/16.
 */
var should = require('should');
var db = require('./biz/db_mssql');

var getArray = function(){
    return [1,2,3];
};
var getString = function(){
    return "H";
};

describe('Test Biz Functions', function(){
    it('should return 1',function(done){
        db.query('select * from [users] where name=\'admin\'',function(err, recordset){
            (recordset.data).should.have.length(1);
            done();
        });
    });
});
describe('Test Promise', function(){
    it('should return 2',function(){
        //getString().should.startWith('H');
        return db.query('select * from [users] where name=\'test\'',function(err, recordset){
            (recordset.data).should.have.length(1);
        }).then(function(data){
            var $ordersql = 'select * from [orders] where userid in(1)';
            return db.query($ordersql,function(err, recordset){
                recordset.data.should.have.length(4);
            });
        });
    });
});