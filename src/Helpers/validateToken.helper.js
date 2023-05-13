'usetrict';
const jwt = require('jsonwebtoken');

const validateToken = ( request, response, next ) => {  
    
    let authHeader = request.headers.authorization;
    authHeader = authHeader.replace('Bearer ', '')

    if( !authHeader ){
        return response.json({
            success: false,
            message : "There is not Token in the request", 
            statusCode: 400
        });    
    }
    try {
        // -----------------------------------Add key Jwt TOKEN
        const verified  = jwt.verify( authHeader, process.env.KEY_JWTOKEN );
        
        if(verified) {
            next()            
        }else{
            // Access Denied
            return response.status(401).json({
                success: false,
                message : 'Wrong Token',
            })
        }        
        
    } catch (e) {
        
        return response.json({
            success: false,
            message : 'Invalid Token',
            statusCode: 400
        });
    }
}
const verifiedToken = (token) => {
    if(token) {
        return jwt.verify( token, process.env.KEY_JWTOKEN );
    }
    return "";
    
}

module.exports = {
    validateToken,
    verifiedToken
}