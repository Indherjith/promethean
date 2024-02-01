const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname : {type : String,required:true},
    lastname : {type : String,required:true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    contact : {type : String,required : true},
    cart : []
})

const UserModel = mongoose.model("user", userSchema)


module.exports = {
    UserModel
}