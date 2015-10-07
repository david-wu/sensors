var React = require('react');
var Source = require('../models/source.js');
var Transform = require('../models/transform.js');
var Client = require('../models/client.js');

var ContextMenu = React.createClass({
    getInitialState: function(){
        return this.props.state;
    },

    createSource: function(){
        return new Source(this.location())
            .sync()
            .then(this.props.addModel);
    },
    createTransform: function(){
        return new Transform(this.location())
            .sync()
            .then(this.props.addModel);
    },
    createClient: function(){
        return new Client(this.location())
            .sync()
            .then(this.props.addModel);
    },
    location: function(){
        return {
            pageX: this.state.pageX,
            pageY: this.state.pageY
        };
    },

    render: function() {
        var menuStyle = {
            left: this.state.pageX,
            top: this.state.pageY,
            color: 'purple',
            display: this.state.visible ? 'block' : 'none'
        };
        return(
            <div style={menuStyle} className="widget floating card">
                <div className="card-header">
                    ContextMenu
                </div>
                <div className="card-body">
                    <div onClick={this.createSource}>Create Source</div>
                    <div onClick={this.createTransform}>Create Transform</div>
                    <div onClick={this.createClient}>Create Client</div>
                </div>
            </div>
        );
    }
});

module.exports = ContextMenu;