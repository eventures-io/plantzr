'use strict';

angular.module('evtrsScrollApp').directive('accordion', function () {

    return {
        restrict: 'E',
        templateUrl: 'components/accordion/accordion.html',
        allowMultipleOpen: '@',
        scope: {
            viewModel: '='
        },
        link: function (scope, element, attrs) {
            //if false, collapse all other panels on toggleCollapse
            var multipleOpen = attrs.multipleOpen;

            scope.toggleCollapse = function (index) {
                angular.forEach(scope.viewModel, function (value, key) {
                    if (key == index) {
                        scope.viewModel[key].collapsed = !scope.viewModel[key].collapsed;
                    }
                    else {
                        if (multipleOpen !== 'true') {
                            scope.viewModel[key].collapsed = true;
                        }
                    }
                });
            }
        }
    };
});