var MongoClient = require('mongodb').MongoClient;

function Client(){
    this.url = 'mongodb://localhost:27017/sensors';
}

Client.prototype.connect = function(){
    var that = this;
    return new Promise(function(resolve, reject){
        MongoClient.connect(that.url, function(err, db){
            if(err){
                reject(err);
            }else{
                resolve(db);
            }
        });
    });
}

module.exports = Client;