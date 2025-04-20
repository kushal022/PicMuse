const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); // enable cors for cross-origin requests

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


require('dotenv').config(); // dotenv import
const port = process.env.PORT;  // access port form .env file

require('./config/db');  // Mongo Database import

const ImageCollection = require('./models/imagesModel'); // import collection of images
const UserCollection = require('./models/userModel.js')

app.use(express.json()); // middleware for parsing json data

//todo------------------------------ Post One Image: ---------------------------------------------------
// post images: 
// app.post('/api/image',async(req,res)=>{
//     try{
//         const {image_id,name,description,location,history,category,url} = req.body;

//         const newImage = new ImageCollection({
//             image_id,
//             name,
//             description,
//             location,
//             history,
//             category,
//             url
//         })
//         await newImage.save();
//         res.status(200).json({message:'Image saved successfully'})
//     }
//     catch(e){
//         console.log("Error in saving Data !!!!!!!!!!")
//     }
// })

//todo------------------------------ Post All/Bulk Images: ---------------------------------------------------
//post all images: .create() method
app.post('/api/image',async(req,res)=>{
    try{
        const images = req.body;
        await ImageCollection.create(images);
        res.status(200).json({message:'Images saved successfully'});
    }
    catch(e){
        console.log('Error in saving image..',e);
    }
})


//todo------------------------------ Update Image: use params ---------------------------------------------------
app.put('/api/image/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        // console.log(req.body)
        // const {name,description} = req.body;
        // console.log(name,description)
        const updatedData = req.body;
        // const updatedImage = await ImageCollection.findOneAndUpdate({_id:id},{$set:{name,description}},{new:true});
        // const updatedImage = await ImageCollection.findOneAndUpdate({_id:id},updatedData); // return old data in res
        const updatedImage = await ImageCollection.findOneAndUpdate({_id:id},updatedData,{new:true}); // return new data in res
        // console.log(updatedImage)
        if(!updatedImage){
            return res.status(404).json({message:"Image not found!"})
        }
        return res.status(200).json({message:"Image updated successfully"})
    }
    catch(e){
        console.log('Error in updating image..',e);
    }
})

//todo------------------------------ Get All Images: ---------------------------------------------------
// get all images:
// app.get('/api/image',async(req,res)=>{
//     try{
//         const images = await ImageCollection.find();
//         res.status(200).json(images);
//     }
//     catch(e){
//         console.log('Error in send image..',e);
//     }
// })

// signup data:

//todo------------------------------ Post One User / Signup User: ---------------------------------------------------
// generate JWT Token: 
app.post('/api/users/signup',async(req,res)=>{
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

//todo------------------------------ Login User: ---------------------------------------------------
// login data: also generate JWT Token
app.post('/api/users/login',async(req,res)=>{
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
        console.log(existingUser)
        

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

//todo------------------------------ Get All Images: with JWT Token: ---------------------------------------------------
app.get('/api/protected/image',(req,res)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message: 'Authorization header missing'});
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
        if(err){
            return res.status(403).json({message: 'invalid or expired token'})
        }
        console.log(decoded);
        const images = await ImageCollection.find();
        res.status(200)
        res.json({images,message:'welcome user',user:decoded})
    })
 })

//  app.get('/api/image',async(req,res)=>{
//     try{
//         const images = await ImageCollection.find();
//         res.status(200).json(images);
//     }
//     catch(e){
//         console.log('Error in send image..',e);
//     }
// })

//todo------------------------------ Start Server ---------------------------------------------------
// start server:
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
