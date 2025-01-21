const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Ensure dotenv is initialized

exports.uploadImage = async (file, folder, height) => {
    try {
        if (!file || !file.tempFilePath) { // Added validation for `tempFilePath`
            throw new Error('Invalid file or tempFilePath');
        }

        const options = {
            folder,
            resource_type: "auto",
        };
        
        // console.log('Uploading to the cloud...');
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error('Cloudinary Upload Error:', error); // Added detailed error logging
        throw error; // Re-throw the error for the calling function to handle
    }
};
