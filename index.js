'use strict';
var fs = require('fs');
var gutil = require('gulp-util');
var through = require('through2');
var marko = require('marko');
var extend = require('node.extend');

function compile(options, data) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-marko-ax5', 'Streaming not supported'));
            return;
        }

        try {
            var tmpl = marko.load(file.path, options.options), position;
            file.contents = new Buffer(tmpl.renderSync(data));

            if (options.extension) {
                // need to change extension
                position = file.path.lastIndexOf('.');
                if (position < 0) position = file.path.length;
                file.path = file.path.substring(0, position) + '.' + options.extension;
            }
            if (options.flatten) {
                file.path = options.flatten.src_root + '/' + file.path.substring(Math.max(file.path.lastIndexOf('/') + 1, file.path.lastIndexOf('\\') + 1), file.path.length);
                file.path = file.path.replace("//", "/");
            }

            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-template', err, {fileName: file.path}));
        }
        cb();
    });
}

module.exports = function (data, options) {

    options.options = extend(true, {
        writeToDisk: false,
        preserveWhitespace: false
    }, options.options);

    return compile(options, data);
};
