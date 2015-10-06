var Model = require('./_model.js');
var React = require('react');
var Pico = require('../components/charts/picoChart.js');

function Client(options){
    _.extend(this, options)
    _.defaults(this, {
        type: 'client',
        name: 'Client Name',
        style: {
            visible: true,
        },
        input: []
    });

}

Client.prototype = Object.create(Model.prototype);

Client.prototype.init = function(reactComponent){
    var context = React.findDOMNode(reactComponent.refs.context)
    new Pico(context);
    this.sync();
}

Client.prototype.drawGraph = function(){
    React.findDOMNode(this.refs.theInput)
}


Client.prototype.body = function(){
    return (<div>
        <div>id: {this.id}</div>
        <div>type: {this.type}</div>
        <div ref="context"></div>
    </div>);
}

Client.prototype.renderElement = function(){
}

module.exports = Client;