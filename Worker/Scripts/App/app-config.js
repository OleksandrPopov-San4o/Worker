
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when("", "/tasks");
    $urlRouterProvider.otherwise("/tasks");
    $stateProvider
        .state('tasks', {
            url: "/tasks",
            views: {
                "main": {
                    templateUrl: "/Templates/Tasks/wrapper.html",
                    controller: 'tasksCtrl'
                }
            }
        })
        .state('tasks.add', {
            url: "/add",
            views: {
                "viewB": {
                    templateUrl: "/Templates/Tasks/add.html"
                }
            }
        })
        .state('tasks.item', {
            url: "/:id",
            views: {
                "viewB": {
                    templateUrl: "/Templates/Tasks/item.html",
                    controller: function ($scope, $stateParams, tasksFactory) {
                        tasksFactory.get({ id: +$stateParams.id }, function (response) {
                            $scope.task = response;
                        });
                    }
                }
            }
        })
        .state('projects', {
            url: "/projects",
            views: {
                "main": {
                    templateUrl: "/Templates/Projects/wrapper.html",
                    controller: function () {
                    },
                }
            }
        }).state('projects.item', {
            url: "/item:id",
            views: {

            }
        });
    return true;
});
