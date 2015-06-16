/**
 * Created by Administrator on 2015/6/16.
 */
var express = require('express');
var path = require('path');
var db = require('../biz/db_mssql');
var router = express.Router();

router.post('/login', function(req,res,next){
    console.log(req.body);
    var _name = (req.body.name||'').trim();
    db.query('select * from [users] where name=\''+_name+'\'',function(err,data){
        console.log(data);
        var model = {};
        if(data.data&&data.data.length>0) model = data.data[0];
        if (data && (model.name||"").toUpperCase()==_name.toUpperCase()
            && (model.password||"").toUpperCase()==req.body.password.toUpperCase()) {
            //记录session
            req.session[__appSessionKey] = model.name;
            res.redirect('/list');

        } else {
            res.send("用户名或密码错误");
        }
    });
});

exports = module.exports = router;