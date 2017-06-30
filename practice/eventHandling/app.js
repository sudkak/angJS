angular.module('ShoppingListEventsApp',[])
.controller('ShoppingListController',ShoppingListController)
.service('ShoppingListService',ShoppingListService)
.factory('ShoppingListFactory',ShoppingListFactory)
.service('WeightLossFilterService',WeightLossFilterService)
.controller('ShoppingListComponentController',ShoppingListComponentController)
.controller('SpinnerController',SpinnerController)
.component('shoppingList',{
    templateUrl :'shoppingList.html',
    controller :'ShoppingListComponentController',
    
    bindings: 
    {items : '<',
    title :'@',
    onRemove :'&'
    }
   
    
    
    
})
.component('loadingSpinner',{
    templateUrl :'spinner.html',
    controller :'SpinnerController'
    
});


SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope){
   $ctrl = this; 
   $rootScope.$on('ShoppingList:Processing',function(event,data){
       if(data.on){
          $ctrl.showSpinner = true; 
           
       }else {
           $ctrl.showSpinner = false;
       }
       
   });
    
    
}


ShoppingListComponentController.$inject = ['$rootScope','$element','$q','WeightLossFilterService'];
function ShoppingListComponentController($rootScope,$element,$q,WeightLossFilterService){
    var $ctrl = this; 
    var totalItems;
    
    $ctrl.$onInit = function(){
        totalItems = 0;
    };
    
    
    $ctrl.$doCheck = function(){
        //console.log($ctrl.items)
        
        console.log(totalItems)
        console.log($ctrl.items.length)
        
        if($ctrl.items.length !== totalItems){
             totalItems = $ctrl.items.length;
             
            $rootScope.$broadcast('ShoppingList:Processing',{on:true});
            var promises = [];
            
            for( var i=0;i<$ctrl.items.length;i++){
                
                //console.log($ctrl.items[i]);
                promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
                
                
            }
            
            console.log(promises);
           $q.all(promises)
           .then( function(result){
               var warnElement = $element.find('div.error');
               console.log($element);
               warnElement.slideUp(900);
                
               
           })
           .catch(function(result){
               var warnElement = $element.find('div.error');
               warnElement.slideDown(900);
               
           })
           .finally( function(){
               $rootScope.$broadcast('ShoppingList:Processing',{on:false})
               
           })
            
            
            
        }
        
        
    }
    
    
    $ctrl.remove = function(myIndex){
        $ctrl.onRemove({index:myIndex});
        
    }
    
}


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory){
  var list = this;
    list.itemName = "";
    list.itemQuantity = "";
    var ShoppingList = ShoppingListFactory();
    
 list.items = ShoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";
    
    list.addItem = function (){
        ShoppingList.addItem(list.itemName,list.itemQuantity);
        list.title = origTitle + " (" + list.items.length + " items )";
        
    }
    
      list.removeItem = function (itemIndex) {
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    ShoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + list.items.length + " items )";
  };
    
    
}


function ShoppingListFactory(){
    var factory = function(maxItems){
        return new ShoppingListService(maxItems);
        
    }
    
    return factory;
    
}

function ShoppingListService(maxItems){
    var service= this;
    
     var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
    
    
    
}


WeightLossFilterService.$inject = ['$q']
function WeightLossFilterService($q){
    var service = this;
    
    service.checkName = function(name){
        
        var deferred = $q.defer();
       
        var result = {
            
            message : ""
            
            
        }
        
       
        // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result)
      }
      else {
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result);
      }
           
       return deferred.promise; 
        
    }
 
    service.checkQuantity = function(){
        var deferred = $q.defer();
        
        var result = {
            
            message:''
        }
        
         // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
        
        
        return deferred.promise; 
        
    }
    
    
    
    
    
    
}

