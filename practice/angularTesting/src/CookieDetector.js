function detectCookies(items){
    for (var i =0;i<items.length;i++){
        
        var item = items[i];
        
        if(item.indexOf('cookie') !== -1){
            return true;
        }
        
        return false;
    }
    
    
}