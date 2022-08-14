
var transpose = function(key) {
    const tranpose = new Array(key[0].length).fill(0).map(() => new Array(key.length));
    
    for(let i = 0; i < key.length; i++) {
        for(let j = 0; j < key[i].length; j++) {
            tranpose[j][i] = key[i][j]
        }
    }
    
    return tranpose
  };
  