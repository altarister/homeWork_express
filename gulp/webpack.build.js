var path = require('path');
var gutil = require("gulp-util");
var webpack = require('webpack');

function build(config) {
    return function(){
        var count = 0;

        webpack(config, function(err, stats){
            if(err) throw new gutil.PluginError("webpack", err);
            gutil.log('[webpack] ┗(￣▽￣ㆀ)┓= build Finish(${++count})', stats.toString({
                colors: true,
                version: false,
                timings: false,
                hash: false,
                assets: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                children: false
            }));
        });
    };
};

module.exports = build;
