// first angular program assignement
(
   function() {
       'use strict'
       angular.module('LunchCheck', [])
           .controller('checkController', ['$scope', '$injector', chController]);


       function chController($scope, $injector) {

           $scope.inputItems = "";

           $scope.toomuch = " ";
           $scope.checkFood = function() {


               var count = getCount($scope.inputItems);
               console.log(count)

               if (count > 3) {
                   $scope.toomuch = "Too Much !!"
               } else {
                   if (count == 0) {
                       $scope.toomuch = "Please enter data first".fontcolor("red");

                       return;
                   }
                   $scope.toomuch = "Enjoy  !! "
                   console.log(count);
               }

           };




           function getCount(str) {
               var arrStr;
               var len = 0;
               var item;
               var pattern = /"\s*"/; //using javascript regular expression


               if (str.length == 0) {
                   console.log(str.length)
                   return 0;

               }


               arrStr = str.split(','); //split the input into array of strings




               //traverse the array , and check each element of the array if any empty
               for (item in arrStr) {


                   if (!(pattern.test(arrStr[item]) || (arrStr[item].length == 0)) /*arrStr[item].length != 0  */ ) {
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
