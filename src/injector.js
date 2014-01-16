(function() {
    'use strict';

    window.Injector = {};

    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    Injector.dependencies = {};

    Injector.annotate = function(fn) {
        var inject = fn._inject;

        if (!fn._inject) {
            var fnText = fn.toString().replace(STRIP_COMMENTS, '');
            var argDecl = fnText.match(FN_ARGS);
            var inject = [];
            var args = argDecl[1].split(FN_ARG_SPLIT);

            for (var i = 0, length = args.length; i < length; i += 1) {
                args[i].replace(FN_ARG, function(all, underscore, name){
                    inject.push(name);
                });
            }

            fn._inject = inject;
        }

        return inject;
    };

    Injector.add = function(fnName, fn) {
        Injector.dependencies[fnName] = fn;
    };

    Injector.get = function(fnName) {
        return Injector.dependencies[fnName];
    };

    return Injector;
}());
