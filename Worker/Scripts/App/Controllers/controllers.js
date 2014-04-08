
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

app.controller('tasksCtrl', ['$scope', 'tasksFactory', 'notificationFactory', '$timeout', function ($scope, tasksFactory, notificationFactory, $timeout) {
    $scope.tasks = [];
    tasksFactory.getAll(
        function (response) {
            $timeout(function () { $scope.tasks = response; }, 350);
        
            $timeout(function () { $scope.initializeWindowSize() }, 0); // its magic. dont touch it
        },
        function (response) { notificationFactory.error(response); }
        );

   
}]);


app.controller('addTaskCtrl', ['$scope', 'tasksFactory', 'notificationFactory', function ($scope, tasksFactory, notificationFactory) {
    $scope.ddTypeItems = [
        { snippet: '<div><i class="fa fa-pencil"></i> Task</div>', text: 'Task', value: '0' },
        { snippet: '<div><i class="fa fa-bug"></i> Bug</div>', text: 'Bug', value: '1' },
        { snippet: '<div><i class="fa fa-exclamation"></i> Issue</div>', text: 'Issue', value: '2' },
    ];
    $scope.ddTypeSelected = $scope.ddTypeItems[0];
    $scope.ddTypeSelectItem = function (choice) {
        $scope.ddTypeSelected = choice;
    }

    $scope.ddPriorityItems = [
        { snippet: '<div>Low</div>', text: 'Low', value: '0' },
        { snippet: '<div>Normal</div>', text: 'Normal', value: '1' },
        { snippet: '<div>High</div>', text: 'High', value: '2' },
    ];
    $scope.ddPrioritySelected = $scope.ddPriorityItems[1];
    $scope.ddPrioritySelectItem = function (choice) {
        $scope.ddPrioritySelected = choice;
    }

    $scope.mytime = (function () { var date = new Date(); date.setHours(8); date.setMinutes(0); return date; })();

    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.save = function () {
        tasksFactory.getNew(function (task) {
            //  {"Id":0,"Title":null,"Description":null,"Estimate":0.0,"Durability":0.0,"Priority":null,"Type":null}
            task.Title = $scope.title;
            task.Description = $scope.desc;
            task.Estimate = +$scope.mytime.getHours() + (+$scope.mytime.getMinutes() / 100);
            task.Priority = $scope.ddPrioritySelected.value;
            task.Type = $scope.ddTypeSelected.value;

            tasksFactory.add(task,
                function (success) { $scope.tasks.push(success); $scope.initializeWindowSize(); notificationFactory.success(); },
                function (error) { notificationFactory.error(error.data.ExceptionMessage); }
                );
        });


    }



}]);

