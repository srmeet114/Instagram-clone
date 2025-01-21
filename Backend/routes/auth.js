const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const tokens = process.env.jwtSecret;

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body;
  if(!name || !userName || !email || !password){
      return res.status(422).json({error:"Please add all the fields"})
  }
  USER.findOne({ $or:[{email: email},{userName: userName}] }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "User already exists with that email or username" });
    }

    bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new USER({
            name,
            userName,
            email,
            password: hashedpassword,
          });
        
          user.save().then((user) => {
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

router.post("/googleLogin", async (req,res)=>{
  try {
    const { email_verified, email, name, clientId, userName, Photo } = req.body;

    if (!email_verified) {
      return res.status(400).json({ error: "Email is not verified!" });
    }

    let savedUser = await USER.findOne({ email }).catch((err) => {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    });

    if (savedUser) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.jwtSecret, { expiresIn: "7d" });
      return res.json({ token, user: savedUser });
    }

    const password = email + clientId;
    const newUser = new USER({
      name,
      email,
      userName,
      password,
      Photo,
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.jwtSecret, { expiresIn: "7d" });

    return res.json({ token, user: newUser });

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
