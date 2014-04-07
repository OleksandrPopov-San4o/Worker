
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
                    controller: 'tasksCtrl',

                    resolve: {
                        delayedData: function ($q, tasksFactory) {
                            // Set up a promise to return
                            var deferred = $q.defer();
                            // Set up our resource calls
                            var tasks = tasksFactory.getAll();
                            // Log out each result so we can see which completed first
                            tasks.$promise.then(function (response) { });
                            // Wait until both resources have resolved their promises, then resolve this promise
                            $q.all([tasks.$promise]).then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        }
                    }
                }
            }
        })
        .state('tasks.add', {
            url: "/add",
            views: {
                "viewB": {
                    templateUrl: "/Templates/Tasks/add.html",
                    controller: function ($scope, $stateParams) {
                    }
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
