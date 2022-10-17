const req = require("express/lib/request");
const res = require("express/lib/response");
const UserModel = require("./models/UserModel");

if(req.body.userId === req.params.id && req.body.isAdmin){
   if(req.body.password){
   try {
       const salt = await bcrypt.genSalt(10)
       req.body.password = await bcrypt.hashSync(req.body.password)
       
   } catch (error) {
       res.status(500).json(error)
   }
}
try {
    const user = await UserModel.findByIdAndUpdate(req.params.id,{$set:req.body})
    res.status(201).json("user updated")
} catch (error) {
    
}


}else{
    res.status(406).json("cannot update this user")
}


const user = await UserModel.findOne({email:req.body.email})
!user && res.status(403).json("user not found")

const verifyPassword = await bcrypt.compare(req.body.password,user.password)
!verifyPassword && res.status(403).json("wrong password")
 res.status(201).json(user)