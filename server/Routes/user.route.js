const {Router} = require("express");
const {register,login}  = require("../Controller/user.controller")
const userRouter = Router();


userRouter.post("/signup",register);

userRouter.post("/login",login);

module.exports = {
    userRouter
}