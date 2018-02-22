import postcss from 'postcss'
import pkg from '../package.json'
import Adaptive from './adaptive'

export default postcss.plugin(pkg.name, (options) => {
  return (css, result) => {
    if (options && options.exclude) {
      if (Object.prototype.toString.call(options.exclude) !== '[object RegExp]') {
        throw new Error('options.exclude should be RegExp!')
      }
      if (options.exclude.test(css.source.input.file)) {
        return (result.root = css)
      }
    }
    const adaptiveIns = new Adaptive(options)
    const output = adaptiveIns.parse(css.toString())
    result.root = postcss.parse(output)
  }
})
