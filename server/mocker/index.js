/*
    Mocker
*/

var http = require('http');
var querystring = require('querystring');

function Mocker(){}

Mocker.fakeDatum = function(){
    // return [Math.random()*100, Math.random()*200];
    return {
        data: [Math.random()*100, Math.random()*200]
    };
}

Mocker.prototype.post = function(callback){
    var dataString = querystring.stringify(Mocker.fakeDatum());
    var options = {
        hostName: 'localhost',
        port: '3000',
        path: '/api/data',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': dataString.length,
            'Connection': 'Keep-Alive',
        },
    };
    var req = http.request(options);
    req.write(dataString);
    req.end();
}

module.exports = Mocker;