const {UserModel} = require("../Model/user.model")

const getcartdata = async(req,res)=>{
    const {email} = req.body;
    const user = await UserModel.findOne({email})
    try{
        res.send({cart:user.cart,msg:"Here your cart Items"})
    }
    catch(err){
        res.send({msg:"Something went wrong"})
    }
}

const addcartdata= async(req,res)=>{
    const {email,product} = req.body;
    try{
        let user = await UserModel.findOne({email})
        let item = {...product,count:1}
        user.cart = [...user.cart,item]
        await user.save();
        res.send({msg:"Product Added to Cart Successfully"})
    }
    catch(err){
        res.send({msg:"Not able to add product to cart"})
    }
}

const updatecartdata= async(req,res)=>{
    const {email,id,count} = req.body;
    try{
        let user = await UserModel.findOne({email})

        let cart = user.cart.filter(item=>(item.id == id))
        cart[0].count = count;

        let newcart = user.cart.filter(item=>(item.id != id))
        newcart.push(cart[0])

        await UserModel.updateOne({email:email},{$set:{cart:newcart}})
        
        res.send({msg:"Cart Updated Successfully"})
    }
    catch(err){
        res.send({msg:"Not able to add product to cart"})
    }
}

const delcartdata= async(req,res)=>{
    const {email,id} = req.body;
    console.log(req.body);
    try{
        let user = await UserModel.findOne({email:email})
        user.cart = user.cart.filter(item=>(item.id != id))
        console.log(user.cart);
        await user.save();
        res.send({msg:"Product Deleted Successfully"})
    }
    catch(err){
        res.send({msg:"Not able remove the product, Try again"})
    }
}

module.exports = {getcartdata,addcartdata,updatecartdata,delcartdata}