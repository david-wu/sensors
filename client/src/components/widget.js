var React = require('react');

var Widget = React.createClass({
    getInitialState: function(){
        return {model: this.props.model};
    },
    componentDidMount: function(){
        var that = this;
        var model = this.state.model;
        if(model.type === 'source'){
            model.sync()
                .then(function(){
                    model.startListening(that.setLatestDatum.bind(that));
                });
        }
    },
    setLatestDatum: function(res){
        this.setState(function(prevState){
            prevState.model.latestDatum = res;
            return prevState
        });
    },
    componentWillUnmount: function(){
        // resource.stopListening
    },
    render: function() {
        return(
            <div className="widget card">
                <div className="card-header">
                    {this.state.model.name}
                    <div onClick={this.props.removeModel}>x</div>
                </div>
                <div className="card-body">
                    <div>host: {this.state.model.address}</div>
                    <div>Port: {this.state.model.port}</div>
                    <div>call method: {this.state.model.method}</div>
                    <div>Interval: {this.state.model.interval}</div>
                    <div>debug: {JSON.stringify(this.state.model.latestDatum)}</div>
                </div>
            </div>
        );
    }
});

module.exports = Widget;