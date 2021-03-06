'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _utils = require('./utils');

var _pxtoremDpr = require('pxtorem-dpr');

var _pxtoremDpr2 = _interopRequireDefault(_pxtoremDpr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin(_package2.default.name, function (options) {
  var blacklist = [];
  if (options && options.exclude) {
    blacklist = options.exclude instanceof Array ? options.exclude : [options.exclude];
  }
  return function (css, result) {
    if ((0, _utils.blacklistedSelector)(blacklist, css.source.input.file)) {
      return result.root = css;
    }
    var adaptiveIns = new _pxtoremDpr2.default(options);
    var output = adaptiveIns.parse(css.toString());
    result.root = _postcss2.default.parse(output);
  };
});