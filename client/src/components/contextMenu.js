var React = require('react');

var ContextMenu = React.createClass({
    getInitialState: function(){
        return this.props.state;
    },
    componentDidMount: function(){
    },
    render: function() {
        console.log(this.props)


        var cmStyle = {
            left: this.state.pageX,
            top: this.state.pageY,
            color: 'purple'
        }
        return(
            <div style={cmStyle} className="widget floating card">
                <div className="card-header">
                    ContextMenu
                </div>
                <div className="card-body">
                    <div>Create Source</div>
                    <div>Create Client</div>
                </div>
            </div>
        );
    }
});

module.exports = ContextMenu;