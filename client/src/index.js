_ = require('lodash');
Q = require('q');

var React = require('react');
var context = document.getElementById('content');
var Dashboard = require('./components/dashboard.js');
React.render(<Dashboard/>, context);

// /*
//     Controller
//     Single DataSets for all charts
// */

// var DataSets = require('../services/dataSets.js');
// var Domain = require('../services/domain.js');
// var LineChart = require('../charts/lineChart.js');
// var DataSource = require('../services/dataSource.js');


// var content = document.getElementById('content');
// var dataSets = new DataSets({});
// var xDomain = new Domain({
//     min: Date.now() - 60000,
//     max: Date.now()
// });


// var lineChart = new LineChart(content, dataSet, {
//     xDomain: xDomain,
//     yDomain: new Domain({}),
// });
// var pieChart = new PieChart(content, dataSet, {
//     xDomain: xDomain,
// });
// var histogramChart = new HistogramChart(content, dataSet, {
//     xDomain: xDomain,
// });


// var dataSource = new DataSource({
//     keys: ['guid1', 'guid2', 'guid3'],
// });
// dataSource.startListening(dataSet.loadInData.bind(dataSet, 'series1'));
// d3 = require('d3');
// var Socket = require('./services/resource/socket.js');
// console.log(new Socket());
// console.log('faafasdff')


// var s1 = require('./services/resources/socket.js')
// var s1 = new Socket();
// s1.setKey('sampleKey');


// var editorContext = document.getElementById('editor')
// var editor = ace.edit(editorContext)
// editor.setTheme('ace/theme/twilight');
// editor.getSession()
//     .setMode('ace/mode/javascript');


// var connection = new Socket()
//     .connect('http://localhost:5000')
//     .then(function(socket){

//         editor.on('change', function(delta){
//             delta = JSON.stringify(delta);
//             if(delta !== currentDelta){
//                 socket.emit('textChange', delta)
//             }
//         })

//         var currentDelta;
//         socket.on('textChange', function(delta){
//             currentDelta = delta;
//             delta = JSON.parse(delta)
//             editor.getSession().getDocument().applyDelta(delta)
//         });

//     })


