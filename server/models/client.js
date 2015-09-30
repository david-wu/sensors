var http = require('http');
var qHttp = require("q-io/http");

function Client(socket){
    Client.all.push(this);
    this.socket = socket;
    this.intervals = [];
    this.requests = [];

    socket.on('disconnect', this.disconnectHandler.bind(this));
    socket.on('syncSource', this.syncSourceHandler.bind(this));
}

Client.all = [];

Client.prototype.disconnectHandler = function(){
    var index = Client.all.indexOf(this);
    Client.all.splice(index, 1);
    for(var i = 0; i < this.intervals.length; i++){
        clearInterval(this.intervals[i]);
    }
}

Client.prototype.syncSourceHandler = function(sourceJson, callback){
    var that = this;

    // Echos back json with an id
    sourceJson.id = sourceJson.id || guid();
    callback(sourceJson);

    that.makeCall(sourceJson);

    var interval = setInterval(function(){
        that.makeCall(sourceJson);
    }, sourceJson.interval)

    this.intervals.push(interval);
}

Client.prototype.makeCall = function(sourceJson){
    var that = this;

    var requestObject = {
        url: sourceJson.address
    };
    this.requests.push(requestObject)

    return qHttp.read(requestObject)

        // Emits response through socket
        .then(function(buffer){
            that.socket.emit(sourceJson.id, {
                timestamp: Date.now(),
                data: buffer.toString()
            });
        })

        // Remove request from requests array
        .then(function(){
            var index = that.requests.indexOf(requestObject);
            that.requests.splice(index,1);
        })
};

function guid(){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
}

module.exports = Client;