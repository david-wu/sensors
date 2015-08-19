var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.set('port', 3000);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var apiRouter = require('./api');
app.use('/api', apiRouter)

app.listen(app.get('port'), function(){
    console.log('Server started port: ' + app.get('port'));
});

var Mocker = require('./mocker')
var mocker = new Mocker();
setInterval(mocker.post.bind(mocker), 1000);

