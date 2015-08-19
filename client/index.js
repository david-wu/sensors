/*
    Controller
    Single DataSets for all charts
*/

var DataSets = require('../services/dataSets.js');
var Domain = require('../services/domain.js');
var LineChart = require('../charts/lineChart.js');
var DataStream = require('../services/dataStream.js');


var content = document.getElementById('content');
var dataSets = new DataSets({});
var xDomain = new Domain({
    min: Date.now() - 60000,
    max: Date.now()
});


var lineChart = new LineChart(content, dataSet, {
    xDomain: xDomain,
    yDomain: new Domain({}),
});
var pieChart = new PieChart(content, dataSet, {
    xDomain: xDomain,
});
var histogramChart = new HistogramChart(content, dataSet, {
    xDomain: xDomain,
});


var dataStream = new DataStream({
    key: 'testStream1'
});
dataStream.startListening(dataSet.loadInData.bind(dataSet, 'series1'));

