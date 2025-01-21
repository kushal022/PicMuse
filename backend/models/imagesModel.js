// Schema of images:

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image_id:Number,
    name: String,
    description: String,
    location: String,
    history:String,
    category:String,
    url:String,
});

//---- Collection of images :
const ImageCollection = mongoose.model('ImageCollection',imageSchema);

module.exports = ImageCollection;

// const imageSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   imagePath: { type: String, required: true },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now },
// });