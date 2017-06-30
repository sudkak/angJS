describe('CookieDetector',function(){
    var itemsWithoutCookies;
    var itemsWithCookies;
    

    beforeEach( function(){
       itemsWithoutCookies = ['apple','banana','gua'] ;
        itemsWithCookies = ['cookie','apple','apricort'];
        
    })
    
    
    it('Should be able to detect no cookies',function(){
        
        var result = detectCookies(itemsWithoutCookies);
        expect(result).not.toBe(true);
        
    });
    
    it('Should detect the cookies',function(){
        
        var result = detectCookies(itemsWithCookies);
        expect(result).toBe(true);
        
    });
    
    
    
    
    
    
});