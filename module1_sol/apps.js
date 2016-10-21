// first angular program assignement
(
  function(){
'use strict'
angular.module('LunchCheck',[])
.controller('checkController',function($scope){

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
     console.log($scope.inputItems);
  var arrStr = str.split(',');
   var len = arrStr.length;
   return len;

 }





});



  })();
