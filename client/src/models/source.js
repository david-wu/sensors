var React = require('react');
var Socket = require('../services/resources/socket.js');

function Source(options){
    _.extend(this, options);
    _.defaults(this, {
        type: 'source',
        name: 'Source Name',
        address: 'http://www.reddit.com/r/all/hot.json',
        port: 80,
        method: 'GET',
        interval: 5000,
        body: '',
        style: {
            visible: true,
        },
        outputs: []
    });

}

Source.prototype.init = function(){
    var that = this;
    this.sync()
        .then(function(){
            that.startListening(function(res){
                that.latestDatum = res;
            });
        });
}

Source.prototype.body = function(){
    return (<div>
        This is a Source
        <div>Host: {this.address}</div>
        <div>Port: {this.port}</div>
        <div>Call method: {this.method}</div>
        <div>Interval: {this.interval}</div>
        <div className="overflow-hidden">debug: {JSON.stringify(this.latestDatum)}</div>
    </div>);
}

// Returns a promise that resolves when server replies with the model's Id
Source.prototype.sync = function(){
    var that = this;
    return Socket.connect()
        .then(function(socket){
            var deferred = Q.defer();
            socket.emit('syncSource', that.form(), function(form){
                that.loadInForm(form);
                deferred.resolve(form);
            });
            return deferred;
        });
};

Source.prototype.startListening = function(callback){
    var that = this;
    Socket.connect()
        .then(function(socket){
            socket.on(that.id, callback);
        });
};

Source.prototype.stopListening = function(callback){
    var that = this;
    Socket.connect()
        .then(function(socket){
            socket.on(that.id, callback);
        });
};

Source.prototype.form = function(){
    return {
        id: this.id,
        name: this.name,
        address: this.address,
        interval: this.interval
    };
};

Source.prototype.loadInForm = function(form){
    _.extend(this, form);
};

module.exports = Source;