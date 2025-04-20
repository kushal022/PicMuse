const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); // enable cors for cross-origin requests

require('dotenv').config(); // dotenv import
const port = process.env.PORT;  // access port form .env file

require('./config/db');  // Mongo Database import

//Import Routes:
const imageRoutes = require('./routes/imageRoute.js')
const userRoutes = require('./routes/userRoute.js')

app.use(express.json()); // middleware for parsing json data

app.use('/api/image', imageRoutes);
app.use('/api/user', userRoutes);

//todo------------------------------ Start Server ---------------------------------------------------
// start server:
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
