// first angular program assignement
(
  function(){
'use strict'
angular.module('LunchCheck',[])
.controller('checkController',['$scope','$injector',chController] );


function chController($scope,$injector) {



$scope.inputItems ="";
$scope.toomuch = "";
$scope.checkFood = function () {

  var count = getCount($scope.inputItems);


if ( count > 4 ){
      $scope.toomuch="You are eating more !!"
  }else {
    $scope.toomuch ="You are on Diet !! Awesome"
  }

};




 function getCount(str)
 {

   if (str.length == 0){
     $scope.toomuch = " Please enter data first"
     console.log("if executed");
     }

     console.log(str.length);
  var arrStr = str.split(',');
   var len = arrStr.length;
   console.log(len);
   return len;


 }





}



  })();
