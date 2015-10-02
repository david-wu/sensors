// Globals
_ = require('lodash');
Q = require('q');

var QHttp = require('q-io/http');
var IO = require('socket.io');
var Client = require('./models/client.js');

var app = App();
// var server = QHttp.Server(app);
var server = require('http').createServer(app)
var io = IO(server);

// Creates new Clients when a socket connection is made
io.on('connection', function(socket){
    var client = new Client(socket);
})

var port = 5000;
server.listen(port, function(){
    console.log('Server started port: ' + port);
});

function App(){
    var app = require('express')();
    var bodyParser = require('body-parser');
    var apiRouter = require('./api');

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use('/api', apiRouter);
    return app;
}
