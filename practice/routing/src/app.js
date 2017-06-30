(function (){
   'use strict' 
 
angular.module('RoutingApp',['ui.router']);
angular.module('RoutingApp')
.config(RoutesConfig);
    
RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider']    
function RoutesConfig($stateProvider,$urlRouterProvider){
    
    $urlRouterProvider.otherwise('/tab1');
    
    $stateProvider
     .state('tab1',{
        url:'/tab1',
        templateUrl : 'src/tab1.html'
        
    })
    
    .state('tab2',{
        url:'/tab2',
        templateUrl:'src/tab2.html'
    })
    
    
}
 
   
   
   
})();