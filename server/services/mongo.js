var MongoDb = require('mongodb');
var MongoClient = MongoDb.MongoClient;
var Q = require('q');
var _ = require('lodash');

function Mongo(options){
    _.extend(this, options);
    _.defaults(this, {
        url: 'mongodb://localhost:27017/sensors'
    });
}

Mongo.prototype.connect = function(){
    return MongoClient.connect(this.url);
    var that = this;
    var deferred = Q.defer();

    MongoClient.connect(that.url, function(err, db){
        if(err){
            deferred.reject(err);
        }else{
            that._db = db;
            deferred.resolve(that);
        }
    });

    return deferred.promise;
};

Mongo.prototype.ensureIndex = function(){

}

Mongo.prototype.createCollection = function(){
    var deferred = Q.defer();
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    args.push(function(err, collection){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(collection);
        }
    });

    this._db.createCollection.apply(this._db, args);
    return deferred.promise;
}

// function Qify(obj, func){
//     obj = obj || this;
//     return function(){
//         var deferred = Q.defer();

//         var args = [];
//         for (var i = 0; i < arguments.length; i++) {
//             args.push(arguments[i]);
//         }

//         args.push(function(err, res){
//             if(err){
//                 deferred.reject(err);
//             }else{
//                 deferred.resolve(res);
//             }
//         });

//         func.apply(obj, args);
//         return deferred;
//     }
// }


module.exports = Mongo;


