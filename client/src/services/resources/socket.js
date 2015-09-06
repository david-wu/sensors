
var Resource = require('./_resource.js');

function Socket(options){
    Resource.call(this);


}

Socket.prototype = Object.create(Resource.prototype);

Socket.prototype.setKey = function(key){
};

Socket.prototype.connect = function(url){
    var that = this;
    this.connection = io.connect(url);
    return new Promise(function(resolve, reject){
        that.connection.on('connect', function(){
            resolve(that.connection);
        });
    });
};

Socket.prototype.disconnect = function(){
};

Socket.prototype.join = function(roomName){
};

Socket.prototype.listen = function(cb){
};

Socket.prototype.requestHistorical = function(){

};

module.exports = Socket;