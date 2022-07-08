const jwt = require('jsonwebtoken')


exports.encrypt = (payload)=>{
    try{
        var token = jwt.sign(payload,'mysecret')
    return token

    }catch(error){
        return{success: false}
    }
    
}

exports.decrypt =(token)=>{
    try{
        var decode = jwt.verify(token,'mysecret')
    return {success: true,data:decode}
    }catch(error){
        return {success:false}
    }}