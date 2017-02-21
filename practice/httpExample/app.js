angular.module('MenuCategoriesApp',[])
.controller('MenuCategoriesController',MenuCategoriesController)
.service('MenuCategoriesService',MenuCategoriesService)
.constant('ApiBasePath','http://davids-restaurant.herokuapp.com/');

MenuCategoriesController.$inject = ['MenuCategoriesService'];

function MenuCategoriesController(MenuCategoriesService){
    var menu = this;
    
    var promise = MenuCategoriesService.getMenuCategories() ;
    
    promise.then(function(response){
       
         menu.categories =  response.data;
        
        
    })
    .catch(function(err){
        console.log("some error")
    })
    
    
    menu.logMenuItems = function(name){
        var promise = MenuCategoriesService.getMenuForCategory(name);
        promise.then(function(response){
            console.log(response.data)
            
        })
        .catch(function(err){
            console.log("some error ");
        })
        
        
    }
    
    
}// controller 

MenuCategoriesService.$inject = ['$http','ApiBasePath'];
function MenuCategoriesService($http,ApiBasePath){
    
    var service = this ; 
    
    service.getMenuCategories = function(){
        
        var response = $http({
            method:'GET',
            url:ApiBasePath+('categories.json'),
                
        });
        
      return response;  
        
    }
    
    
    service.getMenuForCategory = function(name){
        var response = $http({
            method: 'GET',
            url: 'http://davids-restaurant.herokuapp.com/menu_items.json',
            params : {
                category:name
            }
        }
        );
      return response;  
        
    }
    
    
    
    
} // service 



