const express = require('express')
const router = express.Router();

const ImageCollection = require('../models/imagesModel')


//todo------------------------------ Post || Add One Image: ---------------------------------------------------

router.post('/add-one-image',async(req,res)=>{
    try{
        const {image_id,name,description,location,history,category,url} = req.body;

        const newImage = new ImageCollection({
            image_id,
            name,
            description,
            location,
            history,
            category,
            url
        })
        await newImage.save();
        res.status(200).json({message:'Image saved successfully'})
    }
    catch(e){
        console.log("Error in saving Data !!!!!!!!!!",e)
    }
})

//todo------------------------------ Post || Add All/Bulk Images: ---------------------------------------------------
//?post all images: .create() method
router.post('/add-all-image',async(req,res)=>{
    try{
        const images = req.body;
        await ImageCollection.create(images);
        res.status(200).json({message:'Images saved successfully'});
    }
    catch(e){
        console.log('Error in saving image..',e);
    }
})


//todo------------------------------ PUT || Update Image: use params ---------------------------------------------------
router.put('/update-image:id',async(req,res)=>{
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

//todo------------------------------ GET || Get All Images: ---------------------------------------------------
router.get('/get-all-image',async(req,res)=>{
    try{
        const images = await ImageCollection.find();
        res.status(200).json(images);
    }
    catch(e){
        console.log('Error in send image..',e);
    }
})


//todo------------------------------ GET || Get All Images: with JWT Token: ---------------------------------------------------
router.get('/get-protected-image',(req,res)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message: 'Authorization header missing'});
    }
    const token = authHeader.split(' ')[1]; // get token

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

module.exports = router;