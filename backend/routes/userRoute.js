const express=require('express')
const router=express.Router()
const userModel=require('../model/UserData')
const jwt=require("jsonwebtoken")

router.use(express.json());
router.use(express.urlencoded({extended: true}));


router.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});


router.post("/login",async (req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email});

    if(!user){
        return res.sendStatus(404).send({message:"User not found"});
    }

    if(user.password ===req.body.password){
        const payload={unname:req.body.email,pwd:req.body.password}
        const token=jwt.sign(payload,"secret")
        res.status(200).send({message:"Login successful",usertoken:token});
    }else{
        res.status(401).send({message:"Invalid credentials"});

    }
}catch(error){
    console.error(error);
    res.status(500).send({message:"Error in server"});
}
})


module.exports=router;