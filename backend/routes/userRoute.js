const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserCollection = require('../models/userModel')


//todo------------------------------ POST || Signup User: ---------------------------------------------------
// generate JWT Token: 

router.post('/user-signup',async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        // console.log(req.body)
        
       
        //if any detail empty:
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        //Exiting User:
        const existingEmail = await UserCollection.findOne({email})
        if(existingEmail) {
            return res.status(400).json({message:'Email already exists'});
        }
        //email formate is not valid:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        // Password should be > than 8;
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
      

        // Username should be > than 3;
        if(username.length < 3 ){
            return res.status(400).json({message:'Username should be at least 3 characters long'});
        }

        // Hash password:
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword)

        

        //resister new user:
        const newUser = new UserCollection({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save();
        // Generate JWT token:
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log(token)
        res.status(200).json({token,message:'User data saved successfully'})
    }
    catch(e){
        console.log("Error in saving Data !!!!!!!!!!",e)
    }
})

//todo------------------------------ POST || Login User: ---------------------------------------------------
// login data: also generate JWT Token
router.post('/user-login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        // console.log(email)
        // console.log(password)
        
        // if any detail empty:
        if (!email ||!password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //Exiting User:
        const existingUser = await UserCollection.findOne({email})
        if(!existingUser) {
            return res.status(401).json({message:'User not found'});
        }
        // console.log(existingUser)
        

        //Is Password correct:
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            return res.status(401).json({message:'Invalid Password'});
        }
        
        // Generate JWT token:
        // const token = jwt.sign({ username: existingUser.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        const token = jwt.sign({ username: existingUser.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log(token);
        // res.json({token});

        //login user:
        res.status(200).json({token,message:'User logged in successfully'})
        // res.status(200).json({message:'User logged in successfully'})

        }
        catch(e){
            console.log('Error in finding user..',e);
        }
})

module.exports = router