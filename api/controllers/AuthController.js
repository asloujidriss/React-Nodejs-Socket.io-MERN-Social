const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")


module.exports={

Register:async(req,res)=>{
 
  try {
      //generate new password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt)

    
    // create new user 
    const Newuser = new UserModel({
        username:req.body.username,
        email:req.body.email,
        password: hashedPassword ,
        description:req.body.description,
        city:req.body.city,
        from:req.body.from,
        relationship:req.body.relationship,
        isAdmin:req.body.isAdmin
    })
   await Newuser.save({},(err,item)=>{
      if(err){
        res.status(201).json({success:false,message:"failed register"+err, data:null})
      }else{
        res.status(201).json({success:true,message:"success register", data:item})
      }
    })

 } catch (error) {
     res.status(500).json(error)
 }
},
//LOGIN

login: async(req,res)=>{
try {
  const user = await UserModel.findOne({email:req.body.email})
  if(!user){
    res.status(406).json("user not found")
  }else{
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) {
      res.status(406).json("err password")
    }else{
      res.status(200).json(user)
    } 
  } 
} catch (err) {
  res.status(500).json(err)
}
  
}




}