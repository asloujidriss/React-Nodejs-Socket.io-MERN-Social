
const router = require("express").Router()
const UserController = require("../controllers/UserController")



router.put("/update/:id",UserController.update)
router.delete("/delete/:id",UserController.delete)
router.get("/",UserController.GetById)
router.put("/:id/follow",UserController.follow)
router.put("/:id/unfollow",UserController.unfollow)
router.get("/friends/:userId",UserController.GetFriends)


module.exports = router