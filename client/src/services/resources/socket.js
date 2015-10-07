
var Resource = require('./_resource.js');
var io = require('socket.io-client');

function Socket(options){
    Resource.call(this);
    this.url = 'http://localhost:5000';
}

Socket.prototype = Object.create(Resource.prototype);

Socket.prototype.setKey = function(key){
};

Socket.prototype.connect = function(){
    if(this.connection){return this.connection;}

    var that = this;
    this.connection = new Promise(function(resolve, reject){
        var connection = io.connect(that.url);
        connection.on('connect', function(){
            resolve(connection);
        });
        connection.on('connect_error', function(err){
            that.connection = undefined;
            reject(err);
        });
    });

    return this.connection;
};

Socket.prototype.disconnect = function(){
};

Socket.prototype.syncModel = function(form){
    return this.connect()
        .then(function(socket){
            return new Promise(function(resolve, reject){
                socket.emit('syncModel', form, function(res){
                    if(res.err){
                        reject(res.err)
                    }else{
                        resolve(res);
                    }
                });
            });
        });
};

Socket.prototype.join = function(roomName){

};

Socket.prototype.leave = function(roomName){

};

Socket.prototype.listen = function(cb){
};

Socket.prototype.requestHistorical = function(){

};

module.exports = new Socket();