(function() {
    'use strict';

    window.Injector = {};

    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    Injector.dependencies = {};

    Injector.annotate = function(fn) {
        if (!fn._inject) {
            var inject = [];
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

        return fn._inject;
    };

    Injector.add = function(fnName, fn) {
        Injector.dependencies[fnName] = fn;
    };

    Injector.get = function(fnName) {
        return Injector.dependencies[fnName];
    };

    var _invoke = function(name) {
        var fn = Injector.get(name);

        return function() {
            return Injector.invoke(fn);
        };
    };

    Injector.invoke = function(fn, self) {
        var args = [],
        inject = Injector.annotate(fn),
        fnDependency;

        for(var i = 0, length = inject.length; i < length; i += 1) {
            fnDependency = _invoke(inject[i], self);

            args.push(fnDependency);
        }

        return fn.apply(self, args);
    };

    return Injector;
}());
