(function(){
    
   angular.module('SkillOfferMapping',[]) 
    .controller('MultipleSelectSkill',MultipleSelectSkill)
    .controller('MultipleSelectOffer',MultipleSelectOffer)
    .controller('MapOfferSkill',MapOfferSkill);
    //.service('MapService',MapService);
    
  //  MultipleSelectSkill.$inject = [];
    
    function MultipleSelectSkill(){
         selectCtrl= this; 
        
        selectCtrl.multipleSelectSkill =[];
        
        selectCtrl.test = function(){
            console.log("test success");
            
        }
    
    }
    
    
  //  MultipleSelectOffer.$inject = [];
    
    function MultipleSelectOffer(){
         offer= this; 
        
        offer.multipleSelectOffer =[];
        
        
            
        }
    
    
    
    MapOfferSkill.$inject = ['MultipleSelectOffer'];
    
    function MapOfferSkill (MultipleSelectOffer){
        map = this; 
        map.mapOfferSkill = [];
        
        
        map.mapping = function(){
            var mapObj = {
                //skill:MultipleSelectSkill.multipleSelectSkill,
              // offer:MultipleSelectOffer.multipleSelectOffer
            };
            mapOfferSkill.push(mapObj);
         console.log(mapOfferSkill) ;  
            
            
        }
        
        
        
    }
    
    
  /*  function MapService(){
        service = this; 
        
        service.skill = ['skill1','skill2','skill3','skill4'];
        service.offer = ['offer1','offer2','offer3','offer4'];
           
        
    }*/
    
    
    
    
})();