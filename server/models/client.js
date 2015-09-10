var http = require('http');


function Client(socket){
    Client.all.push(this);
    this.socket = socket;
    this.intervals = [];

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

Client.prototype.syncSourceHandler = function(sourceJso, callback){
    var that = this;
    sourceJso.id = sourceJso.id || guid();
    callback(sourceJso);
    that.makeCall(sourceJso);
    var interval = setInterval(function(){
        that.makeCall(sourceJso);
    }, sourceJso.interval)
    this.intervals.push(interval);

}

Client.prototype.makeCall = function(sourceJso){
    var that = this;
    console.log('calling')
    http.get(sourceJso.address, function(res){
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            that.socket.emit(sourceJso.id, {
                timestamp: Date.now(),
                data: JSON.parse(body)
            });
        });
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
}

module.exports = Client;