angular.module('ShoppingCarts',[])
.controller('ShoppingCartOne',ShoppingCartOne)
.controller('ShoppingCartTwo',ShoppingCartTwo)
.factory('ShoppingListFactory',ShoppingListFactory);

ShoppingCartOne.$inject =['ShoppingListFactory'] ;
ShoppingCartTwo.$inject =['ShoppingListFactory'] ;

function ShoppingCartOne(ShoppingListFactory){
 var cartOne = this;
 var shoppingList = ShoppingListFactory(3);
 console.log(shoppingList);
 cartOne.name="";
 cartOne.value="";
 cartOne.error;


cartOne.addItem = function(){
    try{
shoppingList.addItem(cartOne.name,cartOne.value);
    } catch (errors){
         cartOne.error = errors.message;
        }
}

cartOne.items = shoppingList.getItem();
console.log(cartOne.items)

}




function ShoppingCartTwo(){
  var cartTwo = this;

 cartTwo.addCartTwo = function () {


 }


}


function ShoppingListService(maxItems){
  var cartService = this;
  var items = [];

   cartService.addItem = function(itemName,itemQuantity){
   if( (maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems ) ){
      var item = {
              name : itemName,
              quantity : itemQuantity

      };

        items.push(item);
      }
    else {
   throw new Error("Max Items reached ") ;

    }

  } ;

 cartService.getItem = function(){
     return items;

 };


}

function ShoppingListFactory(){
  var factory = function(maxItems){
    return new ShoppingListService(maxItems);

  };
   return factory;
}
