

function Callbacks(){
    this._callbacks = [];
}

Callbacks.prototype.push = function(callback, destroyPromise){
    this._callbacks.push(callback);
    var removeCallback = this.remove.bind(this, callback);

    if(destroyPromise && destroyPromise.then){
        destroyPromise
            .then(removeCallback)
            .catch(function(e){
                console.log('failed to remove callback', e);
            });
    }

    return removeCallback;
}

// Recommend only using this internally
Callbacks.prototype.remove = function(callback){
    var index = this._callbacks.indexOf(callback);
    if(index !== -1){
        this._callbacks.splice(index, 1);
    }
};

Callbacks.prototype.call = function(data){
    return _.map(_.callbacks, function(callback){
        Q(callback(data));
    });
}