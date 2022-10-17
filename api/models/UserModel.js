const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,     
    },
    description:{
        type:String,
        max:20
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    
    city:{
        type:String,
        max:20
    },
    from:{
        type:String,
        max:20
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

},{timestamps:true})

module.exports = mongoose.model("Users",UserSchema)