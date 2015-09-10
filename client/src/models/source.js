var Socket = require('../services/resources/socket.js');

function Source(options){
    var that = this;
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

// Returns a promise that resolves when server replies with the model's Id
Source.prototype.sync = function(){
    var that = this;
    return Socket.connect()
        .then(function(socket){
            return new Promise(function(resolve, reject){
                socket.emit('syncSource', that.form(), function(form){
                    that.loadInForm(form);
                    resolve(form);
                });
            });
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