const cloudinary = require('cloudinary').v2;
require('dotenv').config();

async function connectToCloudinary() {
    //Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME
        ,api_key: process.env.CLOUD_KEY
        ,api_secret: process.env.CLOUD_SECRET
    })

    return cloudinary;
}

module.exports = connectToCloudinary;