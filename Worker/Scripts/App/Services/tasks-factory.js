app.factory('tasksFactory', ['$http', '$resource', function ($http, $resource) {
    return $resource('/api/Task');
}]);

app.factory('taskFactory', ['$http', '$resource', function ($http, $resource) {
    return $resource('/api/Task/:id', { id: '@@id' }, { 'update': { method: 'PUT' } }, { 'query': { method: 'GET', isArray: false } });
}]);