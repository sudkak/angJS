(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingListDirective);


function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
        items : '<',
        badRemove: '=' ,
        onRemove : '&'
      
    }, 
   controller: ShoppingListDirectiveController,
   controllerAs: 'list',
   bindToController: true,
   link: ShoppingListDirectiveLink,
    transclude : true
      
  };

  return ddo;
}

    function ShoppingListDirectiveLink(scope,element,attr,controller){
        
        console.log("Scope of the link" , scope);
        console.log("Controller of the link" , controller);
        console.log("Element of the link" , element)
        
       scope.$watch('list.cookiesInList()',function(newValue,oldValue){
           console.log("Old value is",oldValue);
           console.log("New Value is",newValue);
           
           if(newValue === true){
               displayCookieWarning();
               
           }else {
               removeCookieWarning();
               
           }
           
       });
        
    function displayCookieWarning(){
        
        var warnElement = element.find("div");
        
        warnElement.css('display','block');
        
    }
        
        function removeCookieWarning() {
          var warnElement = element.find('div');
            warnElement.css('display','none');
            
            
        }
        
        
    }
    
    

 function ShoppingListDirectiveController() {
  var list = this;

  list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
} 


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;
   list.warning = "Cookie Detected";

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  };

  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + list.items.length + " items )";
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
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


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
