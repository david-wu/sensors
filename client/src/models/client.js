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

Client.prototype.init = function(reactComponent){
    var context = React.findDOMNode(reactComponent.refs.context)

    new Pico(context);
}


Client.prototype.drawGraph = function(){
    React.findDOMNode(this.refs.theInput)
}


Client.prototype.body = function(){
    return (<div ref="context">
    </div>);
}

Client.prototype.renderElement = function(){
}

module.exports = Client;