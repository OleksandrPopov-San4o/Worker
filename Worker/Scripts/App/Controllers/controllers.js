
'use strict';
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


app.controller('addTaskCtrl', ['$scope', function ($scope) {
    $scope.items = [
        { snippet: "<div>Issue</div>", text:"Issue", value: "0" },
        { snippet: "<div>The second choice!</div>", text: "Bag", value: "1" },
        { snippet: "<div>The third choice!</div>", text: "Task", value: "2" },
    ];
    $scope.selected = $scope.items[0];
    $scope.selectItem = function (choice) {
        $scope.selected = choice;
       
    }

    $scope.mytime = (function () { var date = new Date(); date.setHours(0); date.setMinutes(0); return date; })();

    $scope.hstep = 1;
    $scope.mstep = 15;




}]);

