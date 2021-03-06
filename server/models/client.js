var http = require('http');
var qHttp = require("q-io/http");

function Client(socket){
    Client.all.push(this);
    this.socket = socket;
    this.intervals = [];
    this.requests = [];

    socket.on('disconnect', this.disconnectHandler.bind(this));
    socket.on('syncModel', this.syncModelHandler.bind(this));
}

Client.all = [];

Client.prototype.disconnectHandler = function(){
    var index = Client.all.indexOf(this);
    Client.all.splice(index, 1);
    _.each(this.intervals, function(interval){
        clearInterval(interval);
    });
}

Client.prototype.syncModelHandler = function(modelJson, callback){
    var that = this;

    // Echos back json with an id
    modelJson.id = modelJson.id || guid();
    callback(modelJson);

    if(modelJson.type === 'source'){
        this.beginCalling(modelJson);
    }
}

Client.prototype.beginCalling = function(modelJson){
    var that = this;
    this.makeCall(modelJson);
    var interval = setInterval(function(){
        that.makeCall(modelJson);
    }, modelJson.interval)
    this.intervals.push(interval);
}

Client.prototype.makeCall = function(modelJson){
    var that = this;

    var requestObject = {
        url: modelJson.address
    };
    this.requests.push(requestObject)

    return qHttp.read(requestObject)

        // Emits response through socket
        .then(function(buffer){
            that.socket.emit(modelJson.id, {
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