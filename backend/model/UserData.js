const mongoose=require("mongoose")
const userSchema= new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    phone:Number
})
module.exports=mongoose.model("users",userSchema)