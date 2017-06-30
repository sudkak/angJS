(function(){
  'use strict'
  angular.module('ShoppingList')
  .config(RouterConfig);    
    
RouterConfig.$inject =['$stateProvider','$urlRouterProvider']    
function RouterConfig($stateProvider,$urlRouterProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('home',{
        url:'/',
        templateUrl:'src/shoppinglist/templates/home.template.html'
        
    })
    
    .state('mainList',{
        url:'/main-list',
        templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
        controller: 'MainShoppingListController as mainList',
        resolve:{
          items : ['ShoppingListService',function(ShoppingListService){
             
             return ShoppingListService.getItems();
        
    }]
        
    }
        
    })
    .state('mainList.itemDetail',{
       //url:'/item-detail/{itemId}' ,
       templateUrl:'src/shoppinglist/templates/item-detail.template.html',
       controller: 'ItemDetailController as itemDetail',
        params :{
            itemId:null
            
        }
     /*   resolve : { 
             
            item: ['$stateParams','ShoppingListService',function($stateParams,ShoppingListService){
                   
                   return ShoppingListService.getItems().then(function(items){
                         return items[$stateParams.itemId]
                       
                   })
                
            }]
            
            
        } */
        
        
    });
    
    
}
  
    
})();