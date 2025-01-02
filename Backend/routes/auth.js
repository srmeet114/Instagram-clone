const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const tokens = process.env.jwtSecret;

router.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body; // Destructuring the request body
  if(!name || !userName || !email || !password){ // Checking all the fields are present
      return res.status(422).json({error:"Please add all the fields"})
  }
  USER.findOne({ $or:[{email: email},{userName: userName}] }).then((savedUser) => { // Checking email or username already exists
    if (savedUser) {
      return res.status(422).json({ error: "User already exists with that email or username" });
    }

    bcrypt.hash(password, 12).then((hashedpassword) => { // Hashing the password
        const user = new USER({
            name,
            userName,
            email,
            password: hashedpassword,
          });
        
          user.save().then((user) => { // Saving the user to the database
              res.status(200).json({ message: "User Saved Successfully" });
            }).catch((err) => {
              console.log(err);
            }); 
    });
  })
});

router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch){
              const token = jwt.sign({_id:savedUser._id},tokens)
              const {_id,name,email,username} = savedUser;
              res.status(200).json({token,message:"Successfully signed in",user:{_id,name,email,username}})
            }
            else{
                return res.status(422).json({error:"Invalid password"})
            }
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router;
