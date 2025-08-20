const express=require('express')
const router=express.Router()
const posts=require('../model/productData')
const jwt = require("jsonwebtoken");

function verifyToken(req,res,next){
    let token=req.headers.token
    try{
        if(!token) throw 'unauthorised Access'
        let payload=jwt.verify(token,"secret")
        if(!payload) throw "unauthorised Access"
        next()

    }    
    catch(error){
        res.json({message:error})
    }
}




router.get('/',async(req,res)=>{
try{
    const data=await posts.find();
    res.status(200).send(data)
}
catch(error){
    console.error(error);
    res.status(400).send("data not found")
}

})


router.post('/add',verifyToken,async(req,res)=>{
try{
    const post =req.body;
    const data = await posts(post).save()
    res.status(200).send({message:"product added",product:data})
}
catch(error){
    console.error(error);
    res.status(400).send("failed to add product")
}
})



router.delete("/delete/:id",verifyToken,async(req,res)=>{
try{
    const id=req.params.id;
    await posts.findByIdAndDelete(id);
    res.sendStatus(200).send({message:"product removed"});

}
catch(error){
    console.error(error);
    res.status(500).send("failed to remove the product");
}
});

router.put("/update/:id", verifyToken,async (req, res) => {
    console.log("updation")
    try {
        const id = req.params.id;
        console.log(id)
        const updatedPost = await posts.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPost) {
            return res.status(404).send({ message: "product not found" });
        }

        res.status(200).send({ message: "product updated", data: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update the product");
    }
});


module.exports=router;