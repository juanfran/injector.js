describe('Injector anonate', function() {
    it('get function required dependecies', function() {
        var di = Injector.annotate(function(test1, test2){});
        expect(di[0]).toBe('test1');
        expect(di[1]).toBe('test2');

        di = Injector.annotate(function(test3){});
        expect(di[0]).toBe('test3');

        di = Injector.annotate(function(){});
        expect(di.length).toEqual(0);
    });

    it('cache dependencies', function() {
        var fn = function(test1, test2){};

        Injector.annotate(fn);

        expect(fn._inject[0]).toBe('test1');
        expect(fn._inject[1]).toBe('test2');

        Injector.annotate(fn);

        expect(fn._inject[0]).toBe('test1');
        expect(fn._inject[1]).toBe('test2');
    });
});

describe('Injector add/get', function() {
    it('add', function() {
        var testFunc = function() {};
        var testFunc1 = function() {};

        Injector.add('test1', testFunc);
        Injector.add('test2', testFunc1);

        expect(Injector.get('test1')).toEqual(testFunc);
        expect(Injector.get('test2')).not.toEqual(testFunc);
        expect(Injector.get('test2')).toEqual(testFunc1);
    });
});

describe('Injector invoke', function() {
    it('invoke', function() {
        var testFunc = jasmine.createSpy(),
        testFunc1 = jasmine.createSpy();

        Injector.add('test1', testFunc);
        Injector.add('test2', testFunc1);

        Injector.invoke(function(test1, test2) {
            test1();
            test2();
        });

        expect(testFunc).toHaveBeenCalled();
        expect(testFunc1).toHaveBeenCalled();
    });

    it('3 levels depth invoke', function() {
        var testFunc1 = function(test2) {
            test2();
        };
        var testFunc2 = function(test3) {
            test3();
        };
        var testFunc3 = jasmine.createSpy();

        Injector.add('test1', testFunc1);
        Injector.add('test2', testFunc2);
        Injector.add('test3', testFunc3);

        Injector.invoke(function(test1) {
            test1();
        });

        expect(testFunc3).toHaveBeenCalled();
    });
});
