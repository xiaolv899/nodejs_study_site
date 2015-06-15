/**
 * Created by Administrator on 2015/6/12.
 */
var express = require('express');
var path = require('path');
var db = require('../biz/db_mssql');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('index',{
        partials:{'header': 'share/header'},
        name: req.session[__appSessionKey],
        title: 'Express'
    });
});
router.get('/list',function(req,res,next){
    db.query('select * from [products]',function(err,data) {
        if(err){
            next(err);
        }else {
            res.render('list',{
                partials:{'header': 'share/header'},
                title: 'Express',
                name: req.session[__appSessionKey],
                'list': data.data
            });
        }
    });
});
router.get('/detail/:id',function(req,res,next){
    db.query('select * from [products] where [id]='+parseInt(req.params.id)||0,function(err,data) {
        if(err){
            next(err);
        }else {
            res.render('detail',{
                partials:{'header': 'share/header'},
                title: 'Express',
                name: req.session[__appSessionKey],
                'data': data.data
            });
        }
    });
});
router.get('/logout',function(req,res,next){
    req.session.destroy(function(){
        res.redirect("/");
    });
});
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