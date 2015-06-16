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


exports = module.exports = router;