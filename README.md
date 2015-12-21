[![axisj-contributed](https://img.shields.io/badge/AXISJ.com-Contributed-green.svg)](https://github.com/axisj) ![](https://img.shields.io/badge/Seowoo-Mondo&Thomas-red.svg)

# gulp-marko-ax5

> Render marko template

marko website is http://markojs.com/


##Install

```shell
npm install gulp-marko-ax5 --save-dev
```

## Usage

### `src/greeting.html`

```erb
Hello ${data.name}!

<ul if="notEmpty(data.colors)">
    <li style="color: $color" for="color in data.colors">
        $color
    </li>
</ul>
<div else>
    No colors!
</div>
```

### `gulpfile.js`

```js
var gulp = require('gulp');
var marko_ax5 = require('gulp-marko-ax5');

gulp.task('default', function () {
	return gulp.src('/src/*.html')
        .pipe(marko_ax5({name: 'Thomas', colors: ["red", "green", "blue"]}))
        .pipe(gulp.dest('dist'));
});
```

You can alternatively use set option

```js
var gulp = require('gulp');
var marko_ax5 = require('gulp-marko-ax5');

gulp.task('default', function () {
	return gulp.src('src/*.html')
        .pipe(marko_ax5(
            {name: 'Thomas', colors: ["red", "green", "blue"]},
            {
                options: { // is marko compile option
                    preserveWhitespace: true, // default false
                    allowSelfClosing: {},
                    checkUpToDate: true,
                    writeToDisk: true // default false
                },
                flatten: {
                    src_root: 'src'
                },
                extension: 'html'
            }
        ))
        .pipe(gulp.dest('dist'));
});
```


### `dist/greeting.html`

```html
Hello Thomas!
<ul>
    <li style="color: red">red</li>
    <li style="color: green">green</li>
    <li style="color: blue">blue</li>
</ul>
```

And you can use with [gulp-changed](https://github.com/sindresorhus/gulp-changed)

```js
gulp.task('default', function () {
    gulp.src(PATHS.ax5core.doc_src + '/**/*.html')
        .pipe(changed(PATHS.ax5core.doc_dest))
        .pipe(marko_ax5({
            projectName: "ax5core",
            layoutPath: PATHS.assets.src + '/_layouts/index.marko'
        }))
        .pipe(gulp.dest(PATHS.ax5core.doc_dest));
});
```


## API

### marko_ax5(data, [options])

Render a template using the provided `data`.

#### data

Type: `Object`

The data object used to populate the text.

#### options


##### options

Type: `Object`

[marko `compile` options](http://markojs.com/docs/marko/javascript-api/#defaultoptions).


##### flatten

Type: `Object`

It will ignore the folder structure. It treats it as if it is located the file just below the "src_root".

##### extension

Type: `String`

It is used when you are trying to change the file extension.

## Notes

If you use [grunt](http://gruntjs.com) instead of gulp, but want to perform a similar task, use [grunt-ax-marko](https://github.com/thomasJang/grunt-ax-marko).


## License

MIT © [Thomas Jang](https://axisj.com)
