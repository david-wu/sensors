var React = require('react');

var Widget = require('./widget.js');
var ContextMenu = require('./contextMenu.js');

var Dashboard = React.createClass({
    getInitialState: function(){

        return {
            widgets:[
              {
                title: 'Source',
                body: '',
                style: {
                    visible: true,
                }
              },
              {w: 1, h: 2, x: 0, y: 1},
              {w: 2, h: 2, x: 1, y: 0},
              {w: 1, h: 1, x: 1, y: 2},
            ],
            contextMenu: {
                visible: false,
                pageX: 0,
                pageY: 0,
                options: [{}, {}, {}],
            }
        }
    },
    componentDidMount: function(){

    },
    handleClick: function(event){
        // event.preventDefault();
        console.log(event)
    },
    handleContextMenu: function(event){
        event.preventDefault();
        console.log('right click')
        var pageX = event.pageX;
        var pageY = event.pageY;
        this.setState(function(prevState, props){
            prevState.contextMenu.pageX = pageX;
            prevState.contextMenu.pageY = pageY;
            prevState.contextMenu.visible = true;

            // prevState.widgets.push({test: 2})
            return prevState;
        });
    },
    render: function() {
        console.log('rende3r:', this.state)

        return(
            <div className="dashboard" onContextMenu={this.handleContextMenu} onClick={this.handleClick}>
                <h1>Dashboard!</h1>

                {this.state.widgets.map(function(widget){
                    return <Widget/>
                })}

                <ContextMenu state={this.state.contextMenu}/>
            </div>
        );
    }
});


module.exports = Dashboard;