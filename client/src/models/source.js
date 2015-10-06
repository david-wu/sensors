var Model = require('./_model.js');
var React = require('react');

function Source(options){
    _.extend(this, options);
    _.defaults(this, {
        type: 'source',
        name: 'Source Name',
        address: 'http://www.reddit.com/r/all/hot.json',
        port: 80,
        method: 'GET',
        interval: 5000,
        body: '',
        style: {
            visible: true,
        },
        outputs: []
    });
}

Source.prototype = Object.create(Model.prototype);

Source.prototype.init = function(){
    var that = this;
    return this.sync()
        .then(function(){
            return that.startListening(function(res){
                that.latestDatum = res;
            });
        });
}

Source.prototype.body = function(){
    return (
        <div>
            <div>id: {this.id}</div>
            <div>type: {this.type}</div>
            <div>Host: {this.address}</div>
            <div>Port: {this.port}</div>
            <div>Call method: {this.method}</div>
            <div>Interval: {this.interval}</div>
            <div className="overflow-hidden">debug: {JSON.stringify(this.latestDatum)}</div>
        </div>
    );
}

module.exports = Source;