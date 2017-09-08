## Install

```shell
$ npm install postcss-pxtorem-dpr --save-dev
```


### Input/Output

*With the default settings, only font related properties are targeted.*

```css
// input
h1 {
    margin: 0 0 20px;
    font-size: 32px;/*px*/
    line-height: 1.2;
    letter-spacing: 1px;
}

// output
h1 { 
    margin: 0 0 20px; 
    font-size: 16px; 
    line-height: 1.2; 
    letter-spacing: 0.0625rem; 
}
[data-dpr="2"] h1 { 
    font-size: 32px; 
}
[data-dpr="3"] h1 { 
    font-size: 48px; 
}
        
```

### Example

```js
var fs = require('fs');
var postcss = require('postcss');
var pxtorem = require('postcss-pxtorem');
var css = fs.readFileSync('main.css', 'utf8');
var options = {
    replace: false
};
var processedCss = postcss(pxtorem(options)).process(css).css;

fs.writeFile('main-rem.css', processedCss, function (err) {
  if (err) {
    throw err;
  }
  console.log('Rem file written.');
});
```

### options

Type: `Object | Null`  
Default:
```js
{
    rootValue: 16,
    unitPrecision: 5,
    selectorBlackList: [],
    propList: ['*', '!html', '!body', 'border-radius', '!border'],
    dprPropList: ['font*'] // 匹配属性自动加/*px*/效果
    baseDpr: null, // 如果为空则通过rootValue计算
    dprArray: [2, 3],
    forcePxComment: 'px',
    keepComment: false,
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
}
```

- `rootValue` (Number) The root element font size.
- `unitPrecision` (Number) The decimal numbers to allow the REM units to grow to.
- `propList` (Array) The properties that can change from px to rem.
    - Values need to be exact matches.
    - Use wildcard `*` to enable all properties. Example: `['*']`
    - Use `*` at the start or end of a word. (`['*position*']` will match `background-position-y`)
    - Use `!` to not match a property. Example: `['*', '!letter-spacing']`
    - Combine the "not" prefix with the other prefixes. Example: `['*', '!font*']` 
- `selectorBlackList` (Array) The selectors to ignore and leave as px.
    - If value is string, it checks to see if selector contains the string.
        - `['body']` will match `.body-class`
    - If value is regexp, it checks to see if the selector matches the regexp.
        - `[/^body$/]` will match `body` but not `.body`
- `replace` (Boolean) replaces rules containing rems instead of adding fallbacks.
- `mediaQuery` (Boolean) Allow px to be converted in media queries.
- `minPixelValue` (Number) Set the minimum pixel value to replace.


### Use with gulp-postcss and autoprefixer

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');

gulp.task('css', function () {

    var processors = [
        autoprefixer({
            browsers: 'last 1 version'
        }),
        pxtorem({
            replace: false
        })
    ];

    return gulp.src(['build/css/**/*.css'])
        .pipe(postcss(processors))
        .pipe(gulp.dest('build/css'));
});
```

### A message about ignoring properties
Currently, the easiest way to have a single property ignored is to use a capital in the pixel unit declaration.

// `Px` or `PX` is ignored by `postcss-pxtorem` but still accepted by browsers
```js
.ignore {
    border: 1Px solid; // ignored
    border-width: 2PX; // ignored
}
```
