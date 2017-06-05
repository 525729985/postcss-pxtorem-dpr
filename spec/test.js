
var postcss = require('postcss');
var pxtorem = require('..');
var basicCSS = '.rule { font-size: 15px }';
var filterPropList = require('../lib/filter-prop-list');

var input = 'h1 { margin: 0 0 20px; font-size: 32PX; line-height: 1.2; letter-spacing: 1px; } .mytest h2{ font-size:40PX;}';
var processed = postcss(pxtorem()).process(input).css;
console.log(processed);
