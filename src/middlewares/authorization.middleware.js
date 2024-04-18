const jwt = require('jsonwebtoken');

const tokenVerification = ( req, res, next )=>{
    try {
        jwt.verify(req.headers.authorization, 'thereisnospecialkeyeverexistsinthisapplication');
        next();

    } catch (error) {
        return res.status(401).json({
            Success: false,
            Message: error
        })
    }

    

}

module.exports = { tokenVerification }