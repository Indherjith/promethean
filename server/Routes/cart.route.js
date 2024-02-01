const {Router} = require("express");
const {getcartdata,addcartdata,updatecartdata,delcartdata}  = require("../Controller/cart.controller")
const cartRouter = Router();


cartRouter.post("/",getcartdata);
cartRouter.put("/addcart",addcartdata);
cartRouter.patch("/updatecart",updatecartdata);
cartRouter.post("/delcart",delcartdata)

module.exports = {
    cartRouter
}