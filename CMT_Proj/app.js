(function(){
    
   angular.module('SkillOfferMapping',[]) 
    .controller('MultipleSelectSkill',MultipleSelectSkill)
    .controller('MultipleSelectOffer',MultipleSelectOffer)
    .controller('MapOfferSkill',MapOfferSkill)
    .service('MapService',MapService);
    
   MultipleSelectSkill.$inject = ['MapService'];
    
    function MultipleSelectSkill(MapService){
         selectCtrl= this; 
        
        selectCtrl.multipleSelectSkill =[];
     /*   selectCtrl.passValue = function(){
            MapService.mapSkillArray(selectCtrl.multipleSelectSkill); 
            
        }*/
      //  MapService.mapSkillArray(selectCtrl.multipleSelectSkill); 
        
        selectCtrl.test = function(){
            console.log("test success");
            MapService.mapSkillArray(selectCtrl.multipleSelectSkill); 
         
            
            
        }
    
    }
    
    
   MultipleSelectOffer.$inject = ['MapService'];
    
    function MultipleSelectOffer(MapService){
         offer= this; 
        
        offer.multipleSelectOffer =[];
        
        offer.test = function(){
            MapService.mapOfferArray(offer.multipleSelectOffer);
            
        }
        
            
        }
    
    
    
    MapOfferSkill.$inject = ['MapService'];
    
    function MapOfferSkill(MapService){
        map = this; 
       map.mapOfferSkill = MapService.getOfferSkill();
        console.log(map.mapOfferSkill);
        map.mapping = function (){
            
            MapService.mapping();
            
        }
        
        
        
        
   }
    
    
  
   function MapService(){
        service = this; 
        service.mapOfferSkill = [];
         service.skill =[];
          service.offer = [];
        service.mapSkillArray = function(array){
            
            service.skill = array;
            console.log(service.skill);
            
            
        }
        
        service.mapOfferArray = function(array){
            
            service.offer = array;
            console.log(service.offer);
        }
        
        service.mapping = function(){
            var mapObj = {
                skill:service.skill,
              offer:service.offer
            };
            console.log(mapObj)
           // console.log(MultipleSelectOffer.multipleSelectOffer)
           service.mapOfferSkill.push(mapObj);
         console.log(service.mapOfferSkill) ;  
            
            
        }
         
        service.getOfferSkill = function(){
            return service.mapOfferSkill;
        }
        
           
        
    }
    
    
    
    
})();