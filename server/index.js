const express = require('express');
const {connection} = require("./config/db");
const cors = require("cors");
const app = express();
require("dotenv").config();

const {userRouter} = require("./Routes/user.route"); 
const {cartRouter} = require("./Routes/cart.route")

let PORT = process.env.PORT || 8500;



app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hey people, THERE YOU WILL FIND ALL THE ROUTES FOR LIFESTYLE WEBSITE.");
});
app.use("/authentication",userRouter)
app.use("/cart",cartRouter)

app.listen(PORT,async ()=>{
    try{
        await connection;
        console.log(`Your mongo DataBase is Connected`);
    }catch(err){
        console.log(err)
    }
    console.log(`Listening on port ${PORT}`);
})
