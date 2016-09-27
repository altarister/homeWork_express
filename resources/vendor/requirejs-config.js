var PROVIDER = {
    "cdn": function(url){
        return [
            ((typeof window == 'object' && window.VALVE_BASEURL) ? window.VALVE_BASEURL : "//assets.coupangcdn.com/cdnjs") + url,
            "vendor" + url
        ]
    },
    "pc"    : "app/pc/controllers",
    //"mobile": "app/js/controllers/payment/rocketpay/mobile",
    "common": "app/common",
    "vendor": "vendor"
};

var REQUIRE_JS_PATHS = {};

// directory
var REQUIRE_JS_PATHS_DIRECTORY = {
    "path_common": PROVIDER.common.replace("app/", "dist/"),
    //"path_mobile": PROVIDER.mobile.replace("app/js/", "app/js-dist/"),
    "path_pc"    : PROVIDER.pc    .replace("app/", "dist/")
};

var REQUIRE_JS_PATHS_CDN = {
    "text": PROVIDER.cdn("/require-text/2.0.12/text.min"),
    "css" : PROVIDER.cdn("/require-css/0.1.8/css.min"),
    "hbs" : PROVIDER.cdn("/requirejs-handlebars/0.0.2/hbars.min"),

    "modernizr" : PROVIDER.cdn("/modernizr/2.8.3/modernizr.min"),

    // "es5-shim" : PROVIDER.cdn("/es5-shim/4.3.1/es5-shim.min"),

    "jquery": PROVIDER.cdn("/jquery/1.11.3/jquery.min"),
    // "jquery.spin": PROVIDER.vendor + "/spin/jquery.spin.min",
    // "jquery.ui.position" : PROVIDER.vendor + "/jqueryUi/jquery-ui-position.min",

    // "underscore"       : PROVIDER.cdn("/underscore.js/1.8.3/underscore-min"),
    // "underscore.string": PROVIDER.cdn("/underscore.string/3.2.2/underscore.string.min"),

    "handlebars": PROVIDER.cdn("/handlebars.js/1.3.0/handlebars.min"),

    // "iScroll": PROVIDER.cdn("/iScroll/5.2.0/iscroll.min"),


    // 날짜
    // "moment"   : PROVIDER.cdn("/moment.js/2.4.0/moment.min"),
    // "moment-ko": PROVIDER.cdn("/moment.js/2.4.0/lang/ko.min"),

    // localStorage 라이브러리 (localStorage 미지원 브라우저는 cookie 로 fallback 지원)
    // "store" : PROVIDER.cdn("/store.js/1.3.17/store.min"),

    // 'zenorocha-clipboard' : PROVIDER.cdn('/clipboard.js/1.5.5/clipboard.min')
};

(function(){
    var targetPaths = [REQUIRE_JS_PATHS_DIRECTORY, REQUIRE_JS_PATHS_CDN];
    var length = targetPaths.length;
    //console.log('targetPaths = ',targetPaths);
    console.log('length = ',length);
    console.log('PROVIDER = ',PROVIDER);
    for(var i=0; i<length; i++){
        var path = targetPaths[i];
        for(var key in path){
            if(path.hasOwnProperty(key)){
                REQUIRE_JS_PATHS[key] = path[key];
            }
        }
    }
})();

var REQUIRE_JS_SHIM = {
    "jquery.spin" : {
        deps    : ["jquery"],
        exports : "jQuery.fn.spin"
    },
    "rng": {
        deps: ["prng4"]
    },
    "moment-ko": {
        deps: ["moment"],
        exports: "moment"
    }
};

var REQUIRE_JS_MAP = {
    "hbs" : {
        "Handlebars" : "handlebars"
    }
};

// for webpack
if (typeof exports === "object"){
    module.exports = {
        PROVIDER: PROVIDER,
        REQUIRE_JS_PATHS_CDN: REQUIRE_JS_PATHS_CDN
    };
}