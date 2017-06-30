(function () {
'use strict';

angular.module('ShoppingListComponentApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.component('shoppingList', {
   templateUrl: 'shoppingList.html',
    controller: ShoppingListComponentController,
    bindings : {
        items: '<',
      myTitle: '@title',
      badRemove: '=',
      onRemove: '&'
    }
    
    
});


/*
function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '<',
      myTitle: '@title',
      badRemove: '=',
      onRemove: '&'
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}
*/

ShoppingListComponentController.$inject = ['$scope','$element']
function ShoppingListComponentController ($scope,$element) {
  var $ctrl = this;

  $ctrl.cookiesInList = function () {
    for (var i = 0; i < $ctrl.items.length; i++) {
      var name = $ctrl.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
    
    $ctrl.remove = function(myIndex){
        list.onRemove({index:myIndex})
        
    }
    
    $ctrl.$onInit = function() {
        console.log("COmponent Initialized")
    }
    
 
    $ctrl.$onChanges = function(changeObj) {
        console.log("changes",changeObj);
        
    }
    
    
    
/*    list.$postLink = function(){
        //console.log($element);
        
        $scope.$watch('list.cookiesInList()',function (newValue,oldValue){
            //console.log(list.cookiesInList())
            console.log(newValue)
            console.log(oldValue)
            
            if(newValue === true){
               var warnElement = $element.find('div.error');
                console.log(warnElement)
               // warnElement.display = true;
                warnElement.slideDown(900);
                console.log("true block")
                
            }
            else {
                console.log( "some issue ")
            }
            
        });
        
    }
    */
    
    $ctrl.$postLink = function () {
        
    $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
        console.log(newValue);
        console.log(oldValue);
      console.log($element);
      if (newValue === true) {
        // Show warning
        var warningElem = $element.find('div.error');
        warningElem.slideDown(900);
      }
      else {
        // Hide warning
        var warningElem = $element.find('div.error');
        warningElem.slideUp(900);
      }
    });
  };
    
    
}


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;

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
