(function () {
    
    angular.module('Spinner')
    .component('loadSpinner',{
        templateUrl:'src/spinner/loadingSpinner.template.html',
        controller:SpinnerController
        
    })
    
    
    SpinnerController.$inject = ['$rootScope'];
    
    function SpinnerController($rootScope){
        
        var $ctrl = this; 
        var cancellers = [];
        
        
        $ctrl.$onInit = function () {
            
            var cancel = $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams,options){
                $ctrl.showSpinner = true;
                
            });
            cancellers.push(cancel);
            
            
            cancel = $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams,options){
                
              $ctrl.showSpinner = false;
                
                
            });
            cancellers.push(cancel);
            
            
            cancel = 
                $rootScope.$on('$stateChangeError',function(event,toState,toParams,fromState,fromParams,options){
                  $ctrl.showSpinner = false; 
                
            });
            
            
            
        }
        
        console.log(cancellers);
        
        $ctrl.$onDestroy = function(){
            
            
           cancellers.forEach( function(item){
               
               item();
           })
            
            
            
        } 
       
        
        
    }
    
    
    
    
    
    
})();