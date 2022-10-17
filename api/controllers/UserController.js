const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt") 
const res = require("express/lib/response")

module.exports={
    //Update

    update:async(req,res)=>{

    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password) {
      try{
          const salt = await bcrypt.genSalt(10)

          req.body.password = await bcrypt.hashSync(req.body.password, salt)
      }catch(error){
          return res.status(500).json(error)
      }
      
    }
    try{
   const user = await UserModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
   res.status(200).json({success:true,message:"success update",data:user})
    }catch(error){
     res.status(500).json(error)
    }
    }else{
        res.status(404).json({success:true,message:"You can update only your account",})
    }


//DELETE
    },
   delete:async(req,res)=>{

        if(req.body.userId === req.params.id || req.body.isAdmin){
           
        try{
    
       const user = await UserModel.findByIdAndDelete(req.params.id)
       res.status(201).json({success:true,message:"success delete",data:user})
    
        }catch(error){
        res.status(500).json(error)
        }
        }else{
            res.status(404).json({success:true,message:"You can delete only your account",})
        }

        },
      //get a user 
      GetById:async(req,res)=>{
          const userId = req.query.userId
          const username = req.query.username
          try {
              const user = userId 
              ? await UserModel.findById(userId)
              : await UserModel.findOne({ username:username })
              //!user && res.status(406).json({success:false,message:"cannot find user by this id"})

              const {password,isAdmin , ...others}= user._doc
              res.status(201).json(others)

          } catch (error) {
             res.status(500).json(error) 
          }
      },
      //get friends
GetFriends:async(req,res)=>{
try {
    const user = await UserModel.findById(req.params.userId)
    const friends = await Promise.all(
    user.followings.map(friendId=>{
return UserModel.findById(friendId)
    })
    )
    let friendList = []
    friends.map(friend=>{
        const {_id,username,profilePicture} = friend
        friendList.push({_id,username,profilePicture})
    })
    res.status(200).json(friendList)

} catch (error) {
    res.status(500).json(error)
}
},


      //follow a user
      follow:async(req,res)=>{
      if(req.body.userId !== req.params.id){
         
        try {
            const user = await UserModel.findById(req.params.id)
            const currentuser = await UserModel.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}})
            await currentuser.updateOne({$push:{followings:req.params.id}})
            res.status(200).json("user has been followed")
            }else{
                res.status(403).json("you already follow this user")
            }
              
          } catch (error) {
             res.status(500).json(error) 
          }

}else{
    res.status(403).json("you can not  follow")
}

      },
      //unfollow a user
      unfollow:async(req,res)=>{
          if(req.body.userId !== req.params.id){
              try {
              const user = await UserModel.findById(req.params.id)
              const currentuser =await UserModel.findById(req.body.userId)
              if(user.followers.includes(req.body.userId)){
                  await user.updateOne({$pull:{followers:req.body.userId}})
                  await currentuser.updateOne({$pull:{followings:req.params.id}})
                  res.status(200).json("user has been unfollowed")

              }else{
                  res.status(403).json("you don't follow this user")
              } 
              } catch (error) {
               res.status(500).json(error)   
              }

          }else{
              res.status(403).json("you can not unfollow your self")
          }
      },
     


}