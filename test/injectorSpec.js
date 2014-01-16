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
});
