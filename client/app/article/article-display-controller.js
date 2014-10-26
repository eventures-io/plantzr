'use strict';

//angular.module('evtrsScrollApp')
//    .filter('renderHtml', ['$sce', function($sce){
//        return function(text) {
//            return $sce.trustAsHtml(text);
//        };
//    }]);

//TODO move to admin routes config
angular.module('evtrsScrollApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article-display', {
                url: '/article/:articleId',
                templateUrl: 'app/article/article-display.html',
                controller: 'ArticleDisplayCtrl'
            });
    });

angular.module('evtrsScrollApp').controller('ArticleDisplayCtrl', function ($scope, $stateParams, Article, $sce) {


     var loadArticle = function(){
         Article.get({ id: $stateParams.articleId }, function(data) {
             $scope.article = data;
         });
     }
     loadArticle();

     $scope.renderContent = function() {
         return $sce.trustAsHtml($scope.article.content);
    }

});