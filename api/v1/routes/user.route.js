const express=require("express")
const router=express.Router()

const controller=require("../controllers/user.controller")


router.post("/register",controller.register)

router.post("/login",controller.login)

router.post("/password/forgot",controller.forgotPassword)

router.get("/detail/:id",controller.detail)

module.exports=router;