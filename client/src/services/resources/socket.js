
var Resource = require('./_resource.js');

function Socket(options){
    Resource.call(this);
    this.url = 'http://localhost:5000';

}

Socket.prototype = Object.create(Resource.prototype);

Socket.prototype.setKey = function(key){
};

Socket.prototype.connect = function(){
    var that = this;
    if(this.connection){return this.connection;}

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

Socket.prototype.syncSource = function(){

}

Socket.prototype.join = function(roomName){

};

Socket.prototype.leave = function(roomName){

};

Socket.prototype.listen = function(cb){
};

Socket.prototype.requestHistorical = function(){

};

module.exports = new Socket();