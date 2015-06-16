/**
 * Created by Administrator on 2015/6/16.
 */
var express = require('express');
var path = require('path');
var db = require('../biz/db_mssql');
var router = express.Router();

router.get('/logout',function(req,res,next){
    req.session.destroy(function(){
        res.redirect("/");
    });
});

exports = module.exports = router;