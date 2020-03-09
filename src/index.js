import postcss from 'postcss'
import pkg from '../package.json'
import { blacklistedSelector } from './utils'
import Adaptive from 'pxtorem-dpr'

export default postcss.plugin(pkg.name, (options) => {
  let blacklist = []
  if (options && options.exclude) {
    blacklist = options.exclude instanceof Array ? options.exclude : [options.exclude]
  }
  return (css, result) => {
    if (blacklistedSelector(blacklist, css.source.input.file)) {
      return (result.root = css)
    }
    const adaptiveIns = new Adaptive(options)
    const output = adaptiveIns.parse(css.toString())
    result.root = postcss.parse(output)
  }
})
