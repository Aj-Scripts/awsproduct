const mongoose=require("mongoose")
const productSchema= new mongoose.Schema({
    Product_title:String,
    Product_description:String,
    status:String,
    imageurl:String
})
module.exports=mongoose.model("products",productSchema)