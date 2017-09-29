var fs = require('fs')
var chai = require('chai')
var postcss = require('postcss')
var expect = chai.expect
var adaptive = require('../')

function readFile (filepath) {
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, { encoding: 'utf-8' }) || ''
  }
  return ''
}

describe('integration', function () {

  it('normal', function () {
    var fixture = readFile('test/fixture.css')
    var expected = readFile('test/expected.css')
    var output = postcss().use(adaptive()).process(fixture).css
    expect(output).is.a.string
    expect(output).eql(expected)
  })

  it('auto rem', function () {
    var fixture = readFile('test/fixture-autorem.css')
    var expected = readFile('test/expected.css')
    var output = postcss().use(adaptive({ autoRem: true })).process(fixture).css
    expect(output).is.a.string
    expect(output).eql(expected)
  })

  it('rem prop list', function () {
    var fixture = readFile('test/fixture-px-list.css')
    var expected = readFile('test/expected-px-list.css')
    var output = postcss().use(adaptive({ autoRem: true, propList: [ '*', '!html', '!body', '!border*', 'border-radius'] })).process(fixture).css
    expect(output).is.a.string
    expect(output).eql(expected)
  })
})