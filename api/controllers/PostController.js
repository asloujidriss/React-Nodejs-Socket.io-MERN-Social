const PostModel = require("../models/PostModel")
const UserModel = require("../models/UserModel")



module.exports={
    create:async(req,res)=>{
       const newPost = PostModel(req.body)
       try {
           const Post = await newPost.save()
           res.status(200).json({success:true,message:"success register post", data:Post})
       } catch (error) {
           res.status(500).json(error)
       }
    },

    update:async(req,res)=>{
     try {
      const post = await PostModel.findById(req.params.id)
      if(post.userId === req.body.userId){
      await post.updateOne(req.body)
      res.status(200).json({success:true,message:"success update", post})
      }else{
          res.status(406).json("you can only update your post")
      }  
     } catch (error) {
       res.status(500).json(error)  
     }
    },
    
    delete:async(req,res)=>{
        try {
         const post = await PostModel.findById(req.params.id)
         if(post.userId === req.body.userId){
         await post.deleteOne()
         res.status(200).json({success:true,message:"success delete", post})
         }else{
             res.status(406).json("you can not delete this post")
         }  
        } catch (error) {
          res.status(500).json(error)  
        }
       },
       //like / dislike a post
       likedislike:async(req,res)=>{
         try {
            const post = await PostModel.findById(req.params.id)
           
            if(!post.Likes.includes(req.body.userId)){
         await post.updateOne({$push:{Likes:req.body.userId}})
         res.status(200).json({success:true,message:"u have been liked this post", post})
            }else{
                await post.updateOne({$pull:{Likes:req.body.userId}})
                res.status(200).json({success:true,message:"u have been disliked this post", post})
            }
 
         } catch (error) {
             res.status(500).json(error)
         }
        
         

       
           
       },
        //get post by id
       getById:async(req,res)=>{
         try {
           const post = await PostModel.findById(req.params.id)
            res.status(201).json({success:true,message:"post",post})
         } catch (error) {
             res.status(500).json(error)
         } 
       },
       //get timeline posts
       timeline:async(req,res)=>{
           try {
               const currentuser = await UserModel.findById(req.params.userId)
               const userPosts = await PostModel.find({userId:currentuser._id})
               const friendPosts = await Promise.all(
                   currentuser.followings.map((friendId)=>{
                    return PostModel.find({userId:friendId})
                   })
               )
              res.status(200).json(userPosts.concat(...friendPosts))
              
           } catch (err) {
               res.status(500).json(err)
           }
       },
          //get user's all posts
          profile:async(req,res)=>{
            try {
                const user = await UserModel.findOne({username:req.params.username})
                const posts = await PostModel.find({userId:user._id})
               res.status(200).json(posts)
            } catch (err) {
                res.status(500).json(err)
            }
        }

}