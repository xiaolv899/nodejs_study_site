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

router.get('/orderlist',function(req,res,next){
    var _userlist = null, _orderlist = null;
    db.query('select * from [users] where name=\''+req.session[__appSessionKey]+'\'').
        then(function(data){
            if((_userlist=data).length>0) {
                var _uids = getIds(data,"id");
                var $ordersql = 'select * from [orders] where userid in('+_uids+')';
                return db.query($ordersql);
            }else
                throw 'no data';
        }).
        then(function(orderdata){
            //console.log(orderdata);
            var _pids = getIds((_orderlist=orderdata),"productID");
            var $resultsql = 'select * from [products] where id in('+_pids+')';
            return db.query($resultsql);
        }).
        then(function(prodata){
            for(var y in _orderlist){
                for(var x in _userlist){
                    if(_userlist[x].id == _orderlist[y].userID){
                        _orderlist[y].username = _userlist[x].name;

                        for(var z in prodata){
                            if(_orderlist[y].productID == prodata[z].id){
                                _orderlist[y].proName = prodata[z].name;
                                _orderlist[y].image = prodata[z].image;
                                _orderlist[y].des = prodata[z].des;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            show(req,res,_orderlist);
        }).
        fail(function(err){
            next(err);
        });
});

module.exports = router;