var d3 = require('d3');

function PicoChart(context){
    this.root = d3.select(context)
        .style('overflow', 'hidden');
    this.xOffset = [1];
    console.log(this.movingDiv());
    console.log(this.movingSvg());
    console.log(this.beginGraph())
}

PicoChart.prototype.staticDiv = function(){
}

PicoChart.prototype.movingDiv = function(){

    var movingDiv = this.root
        .selectAll('div.moving')
        .data(this.xOffset);

    movingDiv.enter()
        .append('div')
        .attr('class', 'moving');

    movingDiv
        .style('background-color', 'yellow')
        .style('-webkit-transform', function(d){
            return 'translate3d('+d+'px,0,0)';
        });

    movingDiv.exit()
        .remove();

    return movingDiv;

}

PicoChart.prototype.movingSvg = function(){
    var movingSvg = this.movingDiv()
        .selectAll('svg')
        .data([0]);

    movingSvg.enter()
        .append('svg');

    movingSvg
        .attr('width', 300)
        .attr('height', 300);

    movingSvg.exit()
        .remove();

    return movingSvg;
}

PicoChart.prototype.beginGraph = function(){
    var that = this;
    var movingDiv = this.movingDiv();
    var shiftInverval = setInterval(function(){
        that.xOffset[0]--;
        movingDiv.style('-webkit-transform', 'translate3d(' + that.xOffset[0] + 'px,0,0)');
    }, 16);

    return function(){
        clearInterval(shiftInverval);
    };

}

PicoChart.prototype.setData = function(){

}


module.exports = PicoChart;