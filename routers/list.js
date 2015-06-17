/**
 * Created by Administrator on 2015/6/15.
 */
var express = require('express');
var path = require('path');
var db = require('../biz/db_mssql');
var router = express.Router();

router.get('/',function(req,res,next){
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

exports = module.exports = router;