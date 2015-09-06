
var app = App();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


var openSockets = [];
io.on('connection', function(socket){
    openSockets.push(socket);
    console.log('user connected: ', openSockets.map(function(d){return d.id;}))
    socket.on('textChange', function(val){
        for(var i = 0; i < openSockets.length; i++){
            if(openSockets[i] === socket){continue;}
            openSockets[i].emit('textChange', val);
        }
    })
    socket.on('disconnect', function(){
        if(openSockets.indexOf(socket) !== -1){
            openSockets.splice(openSockets.indexOf(socket), 1);
        }
     });
});







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
