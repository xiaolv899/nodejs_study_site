/**
 * Created by Administrator on 2015/6/12.
 */
__appSessionKey = 'username';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var userLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',//д�ļ�Ƶ�� 1m 1����
    verbose: false,
    date_format: "YYYY-MM-DD"
});

var auth = require('./biz/auth');
var userlogger = require('./biz/weblog');
var router = require('./routers/index');
var product = require('./routers/product');

var app = express();

app.use(session({
    genid: function(req) {
        return uuid.v4() // use UUIDs for session IDs
    },
    secret: 'sssss',
    resave: true,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname,'views'));
app.set('view engine','hjs');
/*app.set('view engine','html');
app.engine('html', require('hjs').__express);*/
app.set('partials', {header: 'share/header'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth({path:["/list","/detail","/product"],login:"/",key:__appSessionKey}));
app.use(userlogger({key: __appSessionKey,stream: userLogStream}));

app.use('/',router);
app.use('/product',product);

app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    //next(404);
    res.render('error',{
        message: err.message,
        error: err
    });
});

module.exports = app;