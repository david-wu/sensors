var React = require('react');

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

Client.prototype.renderElement = function(){
    return(
        <div>
            Client
        </div>
    )
}

module.exports = Client;