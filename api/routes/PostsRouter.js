const router = require("express").Router()
const PostController = require("../controllers/PostController")



router.post("/create",PostController.create)
router.put("/update/:id",PostController.update)
router.delete("/delete/:id",PostController.delete)
router.put("/:id/like-dislike",PostController.likedislike)
router.get("/getbyid/:id",PostController.getById)
router.get("/timeline/:userId",PostController.timeline)
router.get("/profile/:username",PostController.profile)

module.exports= router