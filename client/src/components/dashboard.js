var React = require('react');

var Widget = require('./widget.js');
var ContextMenu = require('./contextMenu.js');

var Dashboard = React.createClass({
    getInitialState: function(){
        return {
            models: [],
            contextMenu: {
                visible: false,
                pageX: 0,
                pageY: 0
            }
        };
    },
    addModel: function(model){
        this.setState(function(prevState){
            prevState.models.push(model);
            return prevState;
        });
    },
    removeModel: function(model){
        var that = this;
        this.setState(function(prevState){
            var modelIndex = that.state.models.indexOf(model);
            prevState.models.splice(modelIndex, 1);
            return prevState;
        });
    },
    handleClick: function(event){
        event.preventDefault();
        this.setState(function(prevState){
            prevState.contextMenu.visible = false;
            return prevState;
        });
    },
    handleRightClick: function(event){
        event.preventDefault();
        var pageX = event.pageX;
        var pageY = event.pageY;
        this.setState(function(prevState, props){
            prevState.contextMenu.pageX = pageX;
            prevState.contextMenu.pageY = pageY;
            prevState.contextMenu.visible = true;
            return prevState;
        });
    },
    render: function() {
        var that = this;

        var modelElements = this.state.models.map(function(model){
            return <Widget {...{
                model: model,
                key: model.id,
                removeModel: that.removeModel.bind(that, model),
            }}/>;
        })

        var reactComponent = (
            <div {...{
                className: "dashboard",
                onClick: this.handleClick,
                onContextMenu: this.handleRightClick,
            }}>

                <h1>Dashboard!</h1>

                {modelElements}

                <ContextMenu {...{
                    state: this.state.contextMenu,
                    addModel: this.addModel
                }}/>
            </div>
        );

        return reactComponent;
    }
});


module.exports = Dashboard;