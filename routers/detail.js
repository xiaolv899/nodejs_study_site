/**
 * Created by Administrator on 2015/6/16.
 */
var express = require('express');
var path = require('path');
var db = require('../biz/db_mssql');
var router = express.Router();

router.get('/:id',function(req,res,next){
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

exports = module.exports = router;