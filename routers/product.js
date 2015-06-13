/**
 * Created by Administrator on 2015/6/13.
 */
var express = require('express');
var db = require('../biz/db_mssql');
var router = express.Router();

router.post('/save',function(req, res, next){
    console.log(req.body);
    var _id = parseInt(req.body.id)||0;
    if(_id>0){
        db.query("update [products] set name='"+req.body.name+"',image='"+req.body.image+"',des='"+req.body.des+"' where id="+_id, function (err, data) {
            if(err){
                next(err);
            }else {
                res.send({
                    isSuccess: true
                });
            }
        });
    }else {
        db.insert({
            name: req.body.name,
            image: req.body.image,
            des: req.body.des
        }, function (err, data) {
            if(err){
                next(err);
            }else {
                res.send({
                    isSuccess: true
                });
            }
        });
    }
});
router.post('/delete',function(req, res, next){
    db.query('delete from products where id='+(parseInt(req.body.id)||0),function (err, data) {
        res.send({
            isSuccess: true
        });
    });
});

module.exports = router;