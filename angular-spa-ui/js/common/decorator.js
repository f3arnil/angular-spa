module.exports = function ($provide) {

    var sayHello = function (hello) {
        console.log('Http can says hello! ', hello);
    }

    var decorateHttp = function ($delegate) {
        $delegate.sayHello = sayHello;
        return $delegate;
    }

    $provide.decorator('$http', decorateHttp)

}
