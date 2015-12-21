module.exports = function ($scope, $state, promises, $stateParams, cmService, configService, contentStorage) {
    var vm = this;
    vm.content = 'contentStorage';
    vm.model = {
        qwerty: 'this is qwerty'
    };

    vm.privateApi = {
        tttt: function (data) {
            vm.model.qwerty = '--->>>Now it is not!!!<<<---';
            console.log($scope, vm);
        }
    }

    $scope.$watch(
        function () {
            return vm.model.qwerty;
        },
        function (newValue, oldValue) {
            console.log(newValue, oldValue);
        }
    )

    $scope.aaaa = function (data) {
        console.log(data);
    };

    console.log($scope, vm);
}
