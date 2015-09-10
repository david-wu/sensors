
var app = App();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Creates new Clients when a socket connection is made
var Client = require('./models/client.js');
io.on('connection', function(socket){
    var client = new Client(socket);
})


server.listen(5000, function(){
    console.log('Server started port: ' + 5000);
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
