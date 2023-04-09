const jwt = require('jsonwebtoken');

const generateTokens =  async ( id, password, fullName, email , role ) => {

    console.log("ABC  ", id, " ", password, "  " , fullName , " " , email, " ", role )
    return new Promise( ( resolve, reject ) => {
        
        const payload = { id, password, fullName, email, role };

        jwt.sign( payload , process.env.KEY_JWTOKEN, { 
            expiresIn: '1h'
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