var React = require('react');

var Widget = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    componentDidMount: function(){

    },
    render: function() {
        return(
            <div className="widget card">
                <div className="card-header">
                    Source Name
                </div>
                <div className="card-body">
                    <div>IP address:</div>
                    <div>Port: 80</div>
                    <div>call methods: [get, post, ws]</div>
                    <div>alerts:</div>
                </div>
            </div>
        );
    }
});

module.exports = Widget;