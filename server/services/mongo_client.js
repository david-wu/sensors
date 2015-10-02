var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var _ = require('lodash');

function MClient(options){
    _.extend(this, options);
    _.defaults(this, {
        url: 'mongodb://localhost:27017/sensors'
    });
}

MClient.prototype.connect = function(){
    var that = this;
    var deferred = Q.defer();

    MongoClient.connect(that.url, function(err, db){
        if(err){
            deferred.reject(err);
        }else{
            that._db = db;
            deferred.resolve(this);
        }
    });

    return deferred.promise;
};

MClient.prototype.ensureIndex = function(){

}

module.exports = MClient;