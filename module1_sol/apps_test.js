// first angular program assignement
//this is tried elminating iife
var lc = angular.module('LunchCheck',[]);

lc.controller("checkController",DIController);


DIController.$inject = ['$scope','$filter','$injector'];


function DIController($scope,$filter,$injector)
{

$scope.inputItems = "";
console.log($scope.inputItems);


$scope.checkFood = function (){
var count = $scope.inputItems.split(',').length;
console.log($scope.inputItems);
console.log(count);
}
//console.log(count);

$scope.upper = function () {

//$scope.inputItems = $filter('uppercase')($scope.inputItems);

var uppCase = $filter('uppercase');
$scope.inputItems = uppCase($scope.inputItems);



}

console.log($injector.annotate(DIController));

}
