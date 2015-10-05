var React = require('react');
var Socket = require('../services/resources/socket.js');

function Transform(options){
    _.extend(this, options);
    _.defaults(this, {
        type: 'transform',
        name: 'Transform Name',
        style: {
            visible: true,
        },
        fnString: '(function(res){console.log(res+1);return res-1})',
        input: [],
        outputs: []
    });
}

Transform.prototype.init = function(){

}

Transform.prototype.body = function(){
    return (<div>
        This is a Transform
    </div>);
}

Transform.prototype.apply = function(res){
    return eval('('+that.fnString+')')(res)
}
// Transform.prototype.sync = function(){
//     var that = this;
//     return Socket.connect()
//         .then(function(socket){
//             return new Promise(function(resolve, reject){
//                 socket.emit('syncTransform', that.form(), function(form){
//                     that.loadInForm(form);
//                     resolve(form);
//                 });
//             });
//         });
// };

// Transform.prototype.startListening = function(callback){
//     var that = this;
//     Socket.connect()
//         .then(function(socket){
//             socket.on(that.id, callback);
//         });
// };


// Transform.prototype.stopListening = function(callback){
//     var that = this;
//     Socket.connect()
//         .then(function(socket){
//             socket.on(that.id, callback);
//         });
// };

// Transform.prototype.form = function(){
//     return {
//         id: this.id,
//         name: this.name,
//         address: this.address,
//         interval: this.interval
//     };
// };

// Transform.prototype.loadInForm = function(form){
//     _.extend(this, form);
// };

module.exports = Transform;