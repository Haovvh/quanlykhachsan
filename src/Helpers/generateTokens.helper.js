const jwt = require('jsonwebtoken');

const generateTokens =  async ( username, password, role ) => {

    
    return new Promise( ( resolve, reject ) => {
        
        const payload = { username, password, role };

        jwt.sign( payload , process.env.KEY_JWTOKEN, { 
            expiresIn: '24h'
        }, ( err, token ) => {

            if( !err ){ 
                resolve( token ); 
            }
            else {
                
                reject( 'No generate Token' ); 
            }
        });

    });   
}

module.exports = {
    generateTokens
}