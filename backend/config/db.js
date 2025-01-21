const mongoose = require('mongoose');

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URT);
        console.log('MongoDB connected...');
    }
    catch(err){
        console.log('MongoDB not connected !!!!',err)
    }
}

connectDb();