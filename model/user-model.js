const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },email: {
        type: String,
        unique: true,
    },password: {
        type: String,
        require: true
    }

})




const User = mongoose.model('jwtTable',userSchema)
module.exports = User