const User = require('../model/user-model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('../utilis/jwt-helper');


exports.signup = async(req,res)=>{
    const body = req.body;
    const userExist = await User.findOne({
    
            email:body.email,
            username:body.userName
    })
    if(userExist){
        return res.status(422).json({
            success:false,
            message:'userName or email already exist'
        })
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(body.password, salt);
    const dataToWrite = {
        userName:body.userName,
        email:body.email,
        password:password
    }
    await User.create(dataToWrite).catch(error=>{
        console.log(error)
    })
    res.status(200).json({
        dataToWrite
    })
   
}
exports.login = async(req,res)=>{
    const body = req.body;
    const userDetails = await User.findOne({
        
         $or: [
             {email:body.email},
             {userName:body.userName}
         ]
    })
    console.log(userDetails)
    if(userDetails){
         const compare = bcrypt.compareSync(body.password,userDetails.password);  
         if(compare){
            const token = jwt.encrypt({
               user_id: userDetails._id
            })
            return res.status(200).json({message:'success',data:token})

    
        }else{
            return res.status(422).json({
                success:false,
                message:'Incorrect password'

            })
        }
        
 
    }else{
         return res.status(404).json({
           success:false,
           message:'user not found'
       })
    }
 }

exports.getUserDetails = async(req,res)=>{
    const params = req.params;
    try{const findUserDetail = await User.findById({
        id:params.id,
        data:console.log(params.id)
})

return res.status(200).json({
    success:true,
    data:findUserDetail        
})}catch(error){
    res.status(400).json({message:false})
}
    
}

exports.userUpdate =async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).json({success:true,data:result})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
exports.userDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.status(200).send(`Document with ${data.userName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
exports.getAll= async(req,res)=>{
    try{
        const getDetails = await User.find()
        res.status(200).json({message:'success',data: getDetails})
    }catch(error){
        res.status(400).json({success: false})
    }
}