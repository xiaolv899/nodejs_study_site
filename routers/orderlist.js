/**
 * Created by Administrator on 2015/6/15.
 */
var express = require('express');
var path = require('path');
var db = require('../biz/db_mssql');
var router = express.Router();

var getIds = function (data,field){
    var _uids = "";
    for (var x in data)
        _uids += "," + data[x][field];
    if(_uids.length>0)
        return _uids.substr(1);
    return _uids;
};
var show = function (req,res,data){
    var $p = {
        partials:{'header': 'share/header'},
        title: 'Express',
        name: req.session[__appSessionKey]
    };
    if(typeof data === 'string')
        $p.errmsg = data;
    else
        $p.list = data;
    res.render('orderlist',$p);
};

router.get('/',function(req,res,next){
    db.query('select * from [users]').
        then(function(data){
            if(data.length>0) {
                var _uids = getIds(data,"id");
                var $ordersql = 'select * from [orders] where userid in('+_uids+')';
                db.query($ordersql).
                    then(function(orderdata){
                        //console.log(orderdata);
                        var _pids = getIds(orderdata,"productID");
                        var $resultsql = 'select * from [products] where id in('+_pids+')';
                        db.query($resultsql).
                            then(function(prodata){
                                for(var y in orderdata){
                                    for(var x in data){
                                        if(data[x].id == orderdata[y].userID){
                                            orderdata[y].username = data[x].name;

                                            for(var z in prodata){
                                                if(orderdata[y].productID == prodata[z].id){
                                                    orderdata[y].proName = prodata[z].name;
                                                    orderdata[y].image = prodata[z].image;
                                                    orderdata[y].des = prodata[z].des;
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                                //console.log(data);
                                show(req,res,orderdata);
                            },function(err){
                                next(err);
                            });
                    },function(err){
                        next(err);
                    });
            }else
                show(req,res,'no data');
        },function(err){
            next(err);
        });
});

module.exports = router;