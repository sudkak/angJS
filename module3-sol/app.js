(function (){
 angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItems);

 
 NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
    
    var ctrl = this; 
    ctrl.term ='';
    ctrl.narrowResults = function(){
     var found   = MenuSearchService.getMatchedMenuItems(ctrl.term);
        
        console.log(found);
        
        found.then(function(response){
            ctrl.foundActual = response;
            console.log(response);
             console.log(ctrl.foundActual);
            
        })
        
       
    }
    
    //foundActual -- implement remove
    
    ctrl.removeItem = function(index){
        
         ctrl.foundActual.splice(index,1);
        
        
    }
    
    
    
} 
    
//MenuSearchService 

  MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
     var service = this;
    
    service.getMatchedMenuItems = function(searchItem){
       return $http({
            method:'GET',
            url :'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function(result){
             var menuItems = result.data;
            
             //service.foundItems =[];
             var foundItems = [];
            console.log(menuItems);
           
           
                   console.log(menuItems.menu_items[1]);
    
              
               for (var item in menuItems.menu_items){
                   
                 if( menuItems.menu_items[item].description.includes(searchItem) )
                   foundItems.push( menuItems.menu_items[item]);
                       
              }
               
         
            console.log(foundItems); 
           return foundItems; 
            
            
        });
      //console.log("promise" + promise);  
           
    }
    
 
    
    
}
    
 
//foundItems directive 
    
function FoundItems(){
    
    var ddo = {
         templateUrl: 'items.html',
        
    scope: {
        items : '=finalItems',
        onRemove : '&'
    }
     
            
    }
 return ddo;   
    
}
    
    
})();



