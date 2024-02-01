const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {UserModel} = require("../Model/user.model")

const register = async (req, res) => {
    const {firstname, lastname, email, password, contact} = req.body;

    const userexits = await UserModel.findOne({email})
    
    if(userexits?.email){
        res.send({"msg" : "Try loggin in, user already exist"})
    } else{

        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                res.send("Something went wrong, please try again later")
            }
            const user = new UserModel({
                firstname,
                lastname,
                email,
                password : hash,
                contact,
                cart:[]
            })
            try{
                await user.save()
                res.json({msg : "Signup successfull"})
            }
            catch(err){
                console.log(err)
                res.send("Something went wrong, please try again")
            }
           
        });
    }

}

const login =  async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    if(user?.email){
        const hash = user?.password
        bcrypt.compare(password, hash, function(err, result) {
            if(err){
                res.send({message:"Something went wrong, plz try again later"})
            }
            if(result){
                const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
                res.json({message : "Login successfull", token,user:user.email})
            }
            else{
                res.send({message : "Invalid credentials, plz signup if you haven't"})
            }
        });
    }
    else{
        res.send({message:"User Not Exits"})
    }
    
    
}

module.exports = {register,login}