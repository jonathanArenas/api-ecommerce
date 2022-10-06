const jwt = require('jsonwebtoken')

const verifyToken = async(req, res , next)=>{
    const token = req.headers.authorization

    try{
        await jwt.verify(token, secret);
        next()
    }catch(error){
        res.send(error)
    }
}