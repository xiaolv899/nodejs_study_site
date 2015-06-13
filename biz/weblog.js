/**
 * Created by Administrator on 2015/6/13.
 */
var option = {};

exports = module.exports = function webLog(options){
    this.opt = option = options || {};
    var stream = options.stream;

    return function userlogger(req, res, next){
        //console.log(req.session.has(options.key));
        if(req.session&&req.session[options.key]) {
            var $date = new Date();
            var $dateformat = $date.getFullYear() + "-" + ($date.getMonth() + 1) + "-" + $date.getDay() + " " + $date.getHours() + ":" + $date.getMinutes() + ":" + $date.getSeconds();
            var logtext = $dateformat;
            logtext += " " + req.url;
            logtext += "\r\n";
            stream.write((req.session[options.key]||"") + " " + logtext);
        }
        next();
    };
};