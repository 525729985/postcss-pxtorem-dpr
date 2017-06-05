// Jasmine unit tests
// To run tests, run these commands from the project root:
// 1. `npm install -g jasmine-node`
// 2. `jasmine-node spec`

/* global describe, it, expect */

'use strict';
var postcss = require('postcss');
var pxtorem = require('..');
var basicCSS = '.rule { font-size: 15px }';
var filterPropList = require('../lib/filter-prop-list');

describe('pxtorem', function () {
    it('should work on the readme example', function () {
        var input = 'h1 { margin: 0 0 20px; font-size: 32px; line-height: 1.2; letter-spacing: 1px; }';
        var output = 'h1 { margin: 0 0 20px; font-size: 16px; line-height: 1.2; letter-spacing: 0.0625rem; }\n[data-dpr="2"] h1 { font-size: 32px; }\n[data-dpr="3"] h1 { font-size: 48px; }';
        var processed = postcss(pxtorem()).process(input).css;
        expect(processed).toBe(output);
    });

    it('should replace the px unit with rem', function () {
        var processed = postcss(pxtorem()).process(basicCSS).css;
        var expected = '.rule { font-size: 7.5px }\n[data-dpr="2"] .rule { font-size: 15px }\n[data-dpr="3"] .rule { font-size: 22.5px }';

        expect(processed).toBe(expected);
    });

    it('should ignore non px properties', function () {
        var expected = '.rule { font-size: 2em }';
        var processed = postcss(pxtorem()).process(expected).css;
        expect(processed).toBe(expected);
    });
    it('should handle < 1 values and values without a leading 0 - legacy', function () {
        var rules = '.rule { margin: 0.5rem .5px -0.2px -.2em }';
        var expected = '.rule { margin: 0.5rem 0.03125rem -0.0125rem -.2em }';
        var options = {
            propWhiteList: ['margin']
        };
        var processed = postcss(pxtorem(options)).process(rules).css;

        expect(processed).toBe(expected);
    });

    it('should handle < 1 values and values without a leading 0', function () {
        var rules = '.rule { margin: 0.5rem .5px -0.2px -.2em }';
        var expected = '.rule { margin: 0.5rem 0.03125rem -0.0125rem -.2em }';
        var options = {
            propList: ['margin']
        };
        var processed = postcss(pxtorem(options)).process(rules).css;

        expect(processed).toBe(expected);
    });

    it('should remain unitless if 0', function () {
        var expected = '.rule { font-size: 0px; font-size: 0; }';
        var processed = postcss(pxtorem()).process(expected).css;
        expect(processed).toBe(expected);
    });
});
