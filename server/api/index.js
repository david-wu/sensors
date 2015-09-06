var express = require('express');
var DatumStreaum = require('../services/datum_stream.js')
var api = express();


api.post('/data', function(req, res){
    console.log('received post to api/data: ', req.body);
    res.end();
})

api.get('/', function(req, res){
    console.log('received get to api/data: ', req.body);
    res.write(JSON.stringify({
        message: 'helloo'
    }));
    res.end();
})


module.exports = api;