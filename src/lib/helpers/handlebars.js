'use strict';

var htmlMinify = require('html-minifier').minify;

module.exports = {
    minify: minify
};

function minify(content) {
    return htmlMinify(content.fn(this), {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
    });
}
