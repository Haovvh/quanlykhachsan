const jwt = require('jsonwebtoken');

const decodeToken = (req) => {
    if( req ){
        const verified  = jwt.verify( req, process.env.KEY_JWTOKEN );        
        console.log("Verified:::", verified)
        return verified
    }
}
module.exports = {
    decodeToken
}