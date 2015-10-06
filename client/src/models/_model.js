var Socket = require('../services/resources/socket.js');

function Model(){
}

// Called when model gets mounted, typically overwritten
Model.prototype.init = function(){
    return this.sync();
}

// Returns a promise that resolves when server replies with the model's Id
Model.prototype.sync = function(){
    var that = this;
    return Socket.connect()
        .then(function(socket){
            return new Promise(function(resolve, reject){
                socket.emit('syncModel', that.form(), function(form){
                    that.loadInForm(form);
                    resolve(that);
                });
            });
        });
};

Model.prototype.startListening = function(callback){
    var that = this;
    Socket.connect()
        .then(function(socket){
            socket.on(that.id, callback);
        });
    return this.stopListening.bind(this, callback);
};

Model.prototype.stopListening = function(callback){
    var that = this;
    Socket.connect()
        .then(function(socket){
            socket.removeListener(that.id, callback);
        });
};

Model.prototype.form = function(){
    return {
        id: this.id,
        type: this.type,
        displayName: this.displayName,
        address: this.address,
        interval: this.interval
    };
};

Model.prototype.loadInForm = function(form){
    _.extend(this, form);
};

module.exports = Model;