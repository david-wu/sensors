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
    // addSource: function(){
    //     this.setState(function(prevState){
    //         prevState.models.push(new Source());
    //         return prevState;
    //     });
    // },
    // addTransform: function(){
    //     this.setState(function(prevState){
    //         prevState.models.push(new Transform());
    //         return prevState;
    //     });
    // },
    // addClient: function(){
    //     var model = new Client();
    //     this.setState(function(prevState){
    //         prevState.models.push(new Client());
    //         return prevState;
    //     });
    // },
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
            this.setState(function(prevState){
                prevState.models.splice(modelIndex, 1);
                return prevState;
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
        return(
            <div className="dashboard"
            onContextMenu={this.handleRightClick}
            onClick={this.handleClick}>

                <h1>Dashboard!</h1>

                <div style={{display: 'flex'}}>
                    {this.state.models.map(function(model){
                        return <Widget
                            model={model}
                            removeModel={that.removeModel.bind(null, model)}/>
                    })}
                </div>

                <ContextMenu
                    state = {this.state.contextMenu}
                    addModel = {that.addModel}/>
            </div>
        );
    }
});


module.exports = Dashboard;