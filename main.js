var C = (function(characters){
    var letters = characters || "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>? ";
    var char = "";
    
    /* generates the needed letters */
    var needed = letters.length*letters.length;
    if(char.length < needed){
        var s = "";
        for(var i = 0; i<needed-char.length; i++){
            s += String.fromCharCode(178 + char.length + i);
        }
        
        char += s;
    }
    
    /* The comp array contains ALL of the characters paired with ALL of the characters */
    var comp = [];
    for(var i = 0; i<letters.length; i++){
        for(var j = 0; j<letters.length; j++){
            comp.push(letters[i] + letters[j]);
        }
    }
    
    return {
        compress: function(txt){
            var r = "";
            for(var i = 0; i<txt.length; i += 2){
                if(i !== txt.length-1){
                    var ind = comp.indexOf(txt[i] + txt[i+1]);
                    
                    if(!ind){
                        throw "Unsupported letter(s): " + txt[i] + txt[i+1];
                    }
                    
                    r += char.charAt(ind);
                } else {
                    r += txt[i];
                }
            }
            
            return r;
        },
        decompress: function(txt){
            var r = "";
            for(var i = 0; i<txt.length; i++){
                if(txt[i].match(new RegExp("[" + letters + "]", "ig"))){
                    r += txt[i];
                    continue;
                }
                r += comp[char.indexOf(txt[i])];
            }
            
            return r;
        },
    };
})();
