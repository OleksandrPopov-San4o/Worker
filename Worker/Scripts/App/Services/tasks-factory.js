//app.factory('tasksFactory', ['$http', '$resource', function ($http, $resource) {
//    return $resource('/api/Task');
//}]);

//app.factory('taskFactory', ['$http', '$resource', function ($http, $resource) {
//    return $resource('/api/Task/:id', { id: '@@id' }, { 'update': { method: 'PUT' } }, { 'query': { method: 'GET', isArray: false } });
//}]);


app.factory('tasksFactory', ['$http', '$resource', function ($http, $resource) {
    return $resource('/api/task/:action/:id',
                   {  },
                   {
                       'getNew': { method: "GET", params: { action: "GetNew"}, isArray: false },
                       'getAll': { method: "GET", params: { action: "GetTasks" }, isArray: true },
                       'get': { method: "GET", params: { action: "GetTask" }, isArray: false },
                       //'delete': { method: 'DELETE' },

                   },
                   {
                       'query': { method: 'GET', isArray: true }
                   }
               );
}]);
