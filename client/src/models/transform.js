var Model = require('./_model.js');
var React = require('react');

function Transform(options){
    _.extend(this, options);
    _.defaults(this, {
        type: 'transform',
        name: 'Transform Name',
        style: {
            visible: true,
        },
        fnString: '(function(res){console.log(res+1);return res-1})',
        input: [],
        outputs: []
    });
}

Transform.prototype = Object.create(Model.prototype);

Transform.prototype.body = function(){
    return (<div>
        <div>id: {this.id}</div>
        <div>type: {this.type}</div>
    </div>);
}

Transform.prototype.apply = function(res){
    return eval('('+that.fnString+')')(res)
}

module.exports = Transform;