var express = require('express');
var api = express();
var MClient = require('../services/mongo_client.js');
var mClient = new MClient();

api.post('/data', function(req, res){
    console.log('received post to api/data: ', req.body);
    res.end();
})

api.get('/', function(req, res){
    console.log('received get to api/data: ', req.body);
    res.write(JSON.stringify({
        message: 'helloo'
    }));

    mClient.connect()
        .then(function(db){
            console.log(db);
            // db.






        });

    res.end();
})


module.exports = api;