(function () {
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ListCheck',ShoppingListCheckOffService);

ToBuyController.$inject = ['ListCheck'];

//To buy controller
function ToBuyController(ListCheck){
    var buyCtrl = this;
     buyCtrl.buyItems = ListCheck.showBuyItems();
     buyCtrl.sizeCheck = function(){
         if (buyCtrl.buyItems.length < 1)
         return true;
     }
         
     console.log(buyCtrl.buyItems);
    buyCtrl.bought = function(index){
        console.log("yahoo  " + index);
        ListCheck.bought(index);
    }
    
}

AlreadyBoughtController.$inject = ['ListCheck'];
//Already bought controller
function AlreadyBoughtController(ListCheck) {
     var boughtCtrl = this;
     boughtCtrl.items = ListCheck.showBoughtItems();
    console.log(boughtCtrl.items);
     boughtCtrl.sizeCheck = function(){
         if (boughtCtrl.items.length < 1)
         return true;
     }
         
     
}

//Service 
function ShoppingListCheckOffService(){
    var shoppingList =this;
  var toBuy =[{name:'fruits',quantity:'10'},{name:'clothes',quantity:'3'},{name:'books',quantity:'10'},{name:'flowers',quantity:'10'},{name:'cookies',quantity:'20'}] ;
    
  var bought =[];
 
    
    //to show buyItems 
  shoppingList.showBuyItems = function()  {
       
       return toBuy;
   }
  shoppingList.showBoughtItems = function(){
      
      return bought;
      
  }
  
  shoppingList.bought = function(index){
       bought.push(toBuy[index] );
      console.log(toBuy[index]);
       console.log(bought);
       
       toBuy.splice(index,1);
      
  }
   
}    
    
})();
