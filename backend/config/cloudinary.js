const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Ensure dotenv is initialized before any other code

exports.cloudinaryConnect = () => {
    try {
        console.log('Configuring Cloudinary...');
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME, // Ensure these variables are loaded correctly
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log('Cloudinary configured successfully!');
    } catch (error) {
        console.error('Cloudinary Configuration Error:', error); // Added detailed error logging
    }
};
