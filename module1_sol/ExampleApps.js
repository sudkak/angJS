(function () {
'use strict';

angular.module('NameCalculator', [])

.controller('NameCaculatorController', function ($scope) {
  $scope.name = "";
  $scope.totalValue = 0;
 console.log($scope.name);

  $scope.displayNumeric = function () {
       console.log($scope.name);
    var totalNameValue = calculatNumericForString($scope.name);
    $scope.totalValue = totalNameValue;
  };


  function calculatNumericForString(string) {
    var totalStringValue = 0;
    for (var i = 0; i < string.length; i++) {
      totalStringValue += string.charCodeAt(i);
    }

    return totalStringValue;
  }

});


})();
