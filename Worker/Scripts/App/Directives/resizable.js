app.directive('resizable', function ($window) {
    var $itemsWrapper = $("#items-wrapper");
    var $innerItemsWrapper = $("#inner-items-wrapper");
    return function ($scope) {
        $scope.initializeWindowSize = function () {
            $scope.windowHeight = $window.innerHeight;
            $scope.windowWidth = $window.innerWidth;
            //avoid changing width on scrollbar showing
            //   if (!$itemsWrapper.length) {
            $itemsWrapper = $("#items-wrapper");
            $innerItemsWrapper = $("#inner-items-wrapper");
            // }
            if ($itemsWrapper.length) {
                $itemsWrapper.css('height', ($scope.windowHeight - $itemsWrapper.offset().top) + "px");
                if ($itemsWrapper.outerHeight() >= $innerItemsWrapper.height() + 10) {
                    $itemsWrapper.css("padding-right", "20px");
                } else { $itemsWrapper.css("padding-right", "5px"); }

            }
        };
        angular.element($window).bind("resize", function () {
            $scope.initializeWindowSize();
        });
        $scope.initializeWindowSize();
    }
});