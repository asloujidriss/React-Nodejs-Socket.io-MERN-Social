const mongoose = require("mongoose")

const dotenv =require("dotenv").config()
const DB = process.env.DB_URI
mongoose.Promise = global.Promise

const Database = mongoose.connect(DB,{UseNewUrlParser:true}).then(res=>{


    console.log("mongodb working good")
}).catch(err=>{
    console.log(err)
})


module.exports= Database