const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin","judge","participant","mentor"] 
    },
    profilePic:{
        type:String,
        default:""
    },
    Status:{
        type:String,
        default:"active",
        enum:["active","inactive","deleted","blocked"]
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    }

    
})

module.exports = mongoose.model("user",userSchema)
