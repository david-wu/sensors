var React = require('react');

var Widget = React.createClass({
    getInitialState: function(){
        return {
            model: this.props.model,
            pageX: 0,
            pageY: 0,
            visible: true
        };
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
    mouseDownHandler: function(e){
        var that = this;

        var downPos = [e.pageX, e.pageY];
        var currPos = [this.state.pageX, this.state.pageY];

        document.body.addEventListener('mousemove', mouseMoveHandler)
        document.body.addEventListener('mouseup', mouseUpHandler)

        function mouseMoveHandler(e){
            that.setState({
                pageX: e.pageX-downPos[0]+currPos[0],
                pageY: e.pageY-downPos[1]+currPos[1],
            });
        }
        function mouseUpHandler(e){
            that.setState({
                pageX: e.pageX-downPos[0]+currPos[0],
                pageY: e.pageY-downPos[1]+currPos[1],
            });
            document.body.removeEventListener('mousemove', mouseMoveHandler);
            document.body.removeEventListener('mouseup', mouseUpHandler);
        }
    },
    render: function() {
        return(
            <div {...{
                style: {
                    '-webkit-transform': 'translate3d('+this.state.pageX+'px,'+this.state.pageY+'px,0)'
                },
                className: 'widget floating card',
            }}>

                <div {...{
                    className: 'card-header draggable',
                    onMouseDown: this.mouseDownHandler,
                }}>
                    <div>{this.state.model.name}</div>
                    <div onClick={this.props.removeModel}>x</div>
                </div>

                <div className="card-body">
                    <div>host: {this.state.model.address}</div>
                    <div>Port: {this.state.model.port}</div>
                    <div>call method: {this.state.model.method}</div>
                    <div>Interval: {this.state.model.interval}</div>
                    <div className="overflow-hidden">debug: {JSON.stringify(this.state.model.latestDatum)}</div>
                </div>

                <div className="connector parent"></div>
                <div className="connector child"></div>

            </div>
        );
    }
});

module.exports = Widget;