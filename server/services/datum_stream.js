/*
    Represents a stream of datum.
*/

var MongoClient = require('./client.js');
var client = new MongoClient();

client.connect()
    .catch(function(err){
        console.log('Cant connect to mongo');
    })
    .then(function(db){
        console.log('Connected to mongo');
    });

function DatumStream(){
    this.guid;
    this.info = {
        title: 'title',
        description: 'cool series',
        author: 'dave',
    };
}

DatumStream.prototype.push = function(datum){
    var now = Math.round(Date.now()/1000);    
}

DatumStream.prototype.listen = function(callback, destroyPromise){

}

DatumStream.prototype.getHistorical = function(start, end, callback){

}

DatumStream.prototype.sum = function(){
    
}

DatumStream.prototype.unsum = function(){
    
}

module.exports = DatumStream;