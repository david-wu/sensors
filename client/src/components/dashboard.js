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
        model = model || {};
        this.setState(function(prevState){
            prevState.models.push(model);
            return prevState;
        });
        return model;
    },
    removeModel: function(model){
        var modelIndex = this.state.models.indexOf(model);
        if(modelIndex !== -1){
            var newModels = this.state.models.slice();
            newModels.splice(modelIndex,1);
            this.setState({
                models: newModels
            });
        }
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
                removeModel: that.removeModel.bind(null, model)
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