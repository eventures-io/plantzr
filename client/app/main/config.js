'use strict';
angular.module('plantzrApp')
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $provide) {

        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/article/article-overview.html'
            })
            .state('create', {
                url: '/article/create',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleCtrl'
            })
            .state('detail', {
                url: '/article/:articleId',
                templateUrl: 'app/article/article-display.html',
                controller: 'ArticleDisplayCtrl'
            })
            .state('edit', {
                url: '/article/edit/:articleId',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleCtrl'
            });


        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$injector', function (taRegisterTool, taOptions, $injector) {

            taRegisterTool('insertImg', {
                iconclass: "fa fa-picture-o",
                action: function () {
                    var rootScope = $injector.get('$rootScope');
                    rootScope.$broadcast('INSERT_IMAGE');
                }
            });

            return taOptions;
        }]);

    });





