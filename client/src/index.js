_ = require('lodash');
Q = require('q');

var React = require('react');
var context = document.getElementById('content');
var Dashboard = require('./components/dashboard.js');
React.render(<Dashboard/>, context);
