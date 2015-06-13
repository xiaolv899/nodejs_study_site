/**
 * Created by Administrator on 2015/6/13.
 */
var path = require('path');
var option = {};

exports = module.exports = function webAuth(options){
    var chkurl = function($path, $curl){
        return ($path.toLowerCase()==$curl.toLowerCase())
            || path.join($curl.toLowerCase(),'').indexOf(path.join($path.toLowerCase(),'/'))==0;
    };
    option = options || {};
    return function webAuth(req, res, next){
        var $ispath = false;
        if(options.path){
            if(typeof options.path === 'string'){
                $ispath = chkurl(options.path, req.url);
            }else{
                for(var x in options.path){
                    $ispath = chkurl(options.path[x], req.url);
                    if($ispath)break;
                    //console.log(this.opt.path[x]);
                }
            }
        }

        var $islogin = req.session[options.key];
        if($islogin){
            //req.session.set(options.key, req.session.get(options.key));
        }
        //console.log($islogin);
        if($ispath && !$islogin){
            //未登陆
            res.redirect(options.login+'?action=timeout');
            return;
        }
        next();
    };
};