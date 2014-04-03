app.controller('MenuCtrl', ['$scope', function ($scope) {
    $scope.urlIs = function (u) {
        return location.pathname.indexOf(u) != -1;
    };
}]);
app.controller('ContentCtrl', ['$scope', function ($scope) {
    $scope.back = function () {
        history.length > 1 && history.back();
    };
}]);

app.controller('tasksCtrl', ['$scope', 'delayedData', '$timeout', function ($scope, delayedData, $timeout) {
    $scope.tasks = delayedData[0];
    $timeout(function () { $scope.initializeWindowSize() }, 0);// its magic. dont touch it
}]);


