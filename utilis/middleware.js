const jwt = require('./jwt-helper')


exports.authentication = (req,res,next)=>{
    const token = req.headers.authorization
    const userData = jwt.decrypt(token)
    if(userData.success){
        req.user_id = userData._id
        next()
    }else{
        return res.status(400).json({
            success:false, 
            message:'user is not authorized'
        }
        )
    }
}

