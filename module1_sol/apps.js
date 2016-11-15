// first angular program assignement
(
  function(){
'use strict'
angular.module('LunchCheck',[])
.controller('checkController',['$scope','$injector',chController] );


function chController($scope,$injector) {



$scope.inputItems = "";
var testStr = $scope.inputItems;
$scope.toomuch = " ";
$scope.checkFood = function () {

  console.log(($scope.inputItems+'').length);
  console.log(testStr.length)
  var count = getCount($scope.inputItems);
console.log(count)

if ( count > 3 ){
      $scope.toomuch="You are eating more !!"
  }
  else {
     if ( count == 0 )
     {
       $scope.toomuch = "Please enter the data first";
      return;
        }
    $scope.toomuch ="You are on Diet !! Awesome"
    console.log(count);
  }

};




 function getCount(str)
 {
    console.log(str.length)
   if (str.length == 0){
    console.log(str.length)
    return  0;

     }

     console.log(str.length);
  var arrStr = str.split(',');
  var len=0;
  var item;
//implementing the logic to avoid empty string in this array .

//traverse the array , and check each element of the array if any empty
for ( item in arrStr){
  console.log(item);
  console.log(arrStr[item])
  console.log(arrStr[item].length)
 if( arrStr[item].length != 0) {
   len += 1;
   console.log(len);
 }

}


console.log(arrStr)


   //var len = arrStr.length;
   console.log(len);
   return len;


 }





}



  })();
