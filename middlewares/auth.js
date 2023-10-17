const jwt = require ('jsonwebtoken')

module.exports = (role) => async (req, res, next) => {
    try{
        const token = req.header('auth').replace('Bearer ', '')
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        if (verify && verify.user.role === role){
           next()
        }else{
            res.status(401).json({msg: 'token invalido'})
        }
        
        
} catch(error){
    res.status(500).json({msg: 'error token', error})
}}