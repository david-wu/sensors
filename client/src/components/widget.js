var React = require('react');

var Widget = React.createClass({
    getInitialState: function(){
        return {
            model: this.props.model,
            pageX: this.props.model.pageX,
            pageY: this.props.model.pageY,
            visible: true
        };
    },
    componentDidMount: function(){
        console.log('init')
        // this.props.model.init(this);
    },
    setLatestDatum: function(res){
        var that;
        this.props.model.latestDatum = res
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
                    <div>{this.props.model.name}</div>
                    <div onClick={this.props.removeModel}>x</div>
                </div>

                <div className="card-body">
                    {this.props.model.body()}
                </div>

                <div className="connector parent"></div>
                <div className="connector child"></div>

            </div>
        );
    }
});

module.exports = Widget;