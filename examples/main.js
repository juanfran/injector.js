var service1 = function() {
    alert("service1");
};

var service2 = function(service1) {
    alert("service2");
    service1();
};

var service3 = function(service1, service4) {
    service1();
    alert(service4());
};

var service4 = function() {
    return "service4!!";
}

Injector.add('service1', service1);
Injector.add('service2', service2);
Injector.add('service3', service3);
Injector.add('service4', service4);

$("#service1").on('click', function(e){
    e.preventDefault();

    Injector.invoke(service1);
});

$("#service2").on('click', function(e){
    e.preventDefault();

    Injector.invoke(service2);
});

$("#service3").on('click', function(e){
    e.preventDefault();

    Injector.invoke(service3);
});
