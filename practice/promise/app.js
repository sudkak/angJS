(function (){
  angular.module('ShoppingListPromiseApp',[])
.controller('ShoppingListController',ShoppingListController)
.service('ShoppingListService',ShoppingListService)
.service('ShoppingListFilterService',ShoppingListFilterService);
    
ShoppingListController.$inject = ['ShoppingListService'];
ShoppingListService.$inject = ['ShoppingListFilterService','$q'];
ShoppingListFilterService.$inject = ['$q','$timeout'];
    
//Controller 
function ShoppingListController(ShoppingListService) {
 var list = this;
 
 list.itemName = ''  ;
 list.itemQuantity = '' ;  
 list.items = ShoppingListService.getItems();
 

 list.addItem = function() {
     
     ShoppingListService.addItem(list.itemName,list.itemQuantity);
     
 }
     
    
}  //controller end 
 
function ShoppingListService (ShoppingListFilterService,$q)  {
    
    service = this;
    var items = [];
    
/*    service.addItem = function(name,quantity){
      var promise = ShoppingListFilterService.checkName(name) ; 
        promise.then(function(response){
            var nextPromise = ShoppingListFilterService.checkQuantity(quantity);
            
            nextPromise.then(function(result){
                
                var item = {
                    name:name,
                    quantity:quantity
                };
                
                items.push(item);
                
                
            },
                             
                             
                             function(errorResponse){
                console.log(errorResponse.message);
                
            });
            
            
        },
        function(errorResult){
            console.log(errorResult.message);
            
        });
        
    }*/ 
    
/*    service.addItem = function(name,quantity){
        var promise = ShoppingListFilterService.checkName(name);
        
        promise.then(function(response){
            
            return ShoppingListFilterService.checkQuantity(quantity);
            
         })
        .then(function(response){
            var item = {
                name:name,
                quantity:quantity
                
            }
            
            items.push(item);
            
            
        })
        
        .catch(function(errorResponse){
          console.log(errorResponse.message)  ;
            
        });
        
        
    
        
    }*/
    
    service.addItem = function(name,quantity){
        
        var namePromise = ShoppingListFilterService.checkName(name);
        var quantPromise = ShoppingListFilterService.checkQuantity(quantity);
        
        $q.all([namePromise,quantPromise]).then(function(response){
            
             var item = {
                name:name,
                quantity:quantity
                
            }
            
            items.push(item);
            
            
        })
        
        .catch(function(errorResponse){
            console.log(errorResponse.message);
        })
        
    }
    
    
    
    service.getItems = function(){
        
        return items;
    }
    
    
    
    
} //ShoppingListService
    
    
function ShoppingListFilterService($q,$timeout)  {
    service = this;
    //promise implementation 
    service.checkName = function(name){
        var deferred = $q.defer();
        var result = {
            message:""
        };
       
    $timeout(function(){
        
        if(name.toLowerCase().indexOf('cookie') === -1){
            
        deferred.resolve(result);
            
        } else {
            result.message= "Stay away from cookies ";
            deferred.reject(result);
        }
        
        
    },3000);  
        
     return deferred.promise;   
        
    }  //checkName()
    
    
    
    
    service.checkQuantity = function(quantity){
        var deferred = $q.defer();
        var result = {
           message:"" 
            
        };
        
        $timeout(function(){
            if(quantity < 5 ){
                deferred.resolve(result);
                
            }else {
                result.message="Quantity not allowed ";
                deferred.reject(result);
                
            }
            
            
        },1000);
        
        return deferred.promise;
        
    }
    
   
    
    

} //ShoppingList Filter service
    
    
})();

