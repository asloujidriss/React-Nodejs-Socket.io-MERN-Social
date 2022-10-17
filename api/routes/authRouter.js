const res = require("express/lib/response")

const router = require("express").Router()

const AuthController = require("../controllers/AuthController")




router.post("/register",AuthController.Register)
router.post("/login",AuthController.login)



module.exports = router