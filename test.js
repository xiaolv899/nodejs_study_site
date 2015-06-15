/**
 * Created by Administrator on 2015/6/15.
 */
//var events = require('events');
//var eventEmitter = new events.EventEmitter();
var q = require('q');

var step1 = function(callback){
    console.log('step1 start');
    var deferred = q.defer();
    setTimeout(function(){
        callback('step1');
        //eventEmitter.emit('step1end');
        deferred.resolve('step1');
    },3000);
    return deferred.promise;
};

var step2 = function(callback){
    console.log('step2 start');
    var deferred = q.defer();
    setTimeout(function(){
        callback('step2');
        //eventEmitter.emit('step2end');
        deferred.resolve('step2');
    },2000);
    return deferred.promise;
};
var step3 = function(callback){
    console.log('step3 start');
    var deferred = q.defer();
    setTimeout(function(){callback('step3');deferred.resolve('step3');},1000);
    return deferred.promise;
};

var _callback = function(msg){
    console.log(msg+' end')
};

/*step1(function(msg1){
    _callback(msg1);
    step2(function(msg2){
        _callback(msg2);
        step3(_callback);
    });
});*/

/*step1(_callback,function(){
    step2(_callback, function(){
        step3(_callback);
    });
});*/

//step1(_callback);
//meteor
//step2(_callback);
//step3(_callback);

/*
eventEmitter.on('step1end',function(){
    step2(_callback);
});
eventEmitter.on('step2end',function(){
    step3(_callback);
});
step1(_callback);*/

/*q.fcall(function(){
    step1(_callback);
}).then(function(){
    step2(_callback);
}).then(function(){
    step3(_callback);
}).done();*/
step1(_callback).then(function(msg1){
    console.log(msg1);
    step2(_callback).then(function(msg2){
        console.log(msg2);
        step3(_callback).then(function(msg3){

        });
    });
});
//q.fcall(step1).then(step2).then(step3);