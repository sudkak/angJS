(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController',ShoppingListController)
.provider('ShoppingListProvider',ShoppingListServiceProvider)
.config(Config);
Config.$inject = ['ShoppingListProviderProvider'];

    function Config(ShoppingListProviderProvider){
        ShoppingListProviderProvider.defaults.maxItems = 2;
        
    }

 


ShoppingListController.$inject = ['ShoppingListProvider'] ;   
    
function ShoppingListController(ShoppingListProvider){
    var list = this;
    
     list.items = ShoppingListProvider.getItems();           
     list.itemName = "";
     list.itemQuantity = "";
     list.addItem = function() {  
         try {
        ShoppingListProvider.addItems(list.itemName,list.itemQuantity);
             
     } catch(error){
        list.errorMessage = error.message;
         
     }
    
    
  }
 list.removeItem = function(index) {
     ShoppingListProvider.removeItem(index);
     
 }    
     
}
    
function ShoppingListService(maxItems) {
    var  listService = this;
    var items =[ ];

         listService.addItems = function(name,quantity){
             
              if(maxItems === undefined || (maxItems !== undefined && items.length < maxItems ) ){
                 var item = {
            itemName:name,
            itemQuantity:quantity
        }
        items.push(item);  
              } else {
        throw new Error("Max Items  " +  maxItems  +" reached ");
        }
         }
   
    console.log(items);
    listService.getItems = function(){
        
        return items;
    }
    
    listService.removeItem = function(index){
        items.splice(index,1);
        
        
    }
    
}
    
function ShoppingListServiceProvider(){
    var provider = this;
    provider.defaults = {
        maxItems:3
        
        
    };
    
    provider.$get = function() {
        
       var listService = new ShoppingListService(provider.defaults.maxItems);
        return listService;
        
    }
    
}
    

   


})();
