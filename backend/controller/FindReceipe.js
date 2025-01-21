const { cloudinaryConnect } = require('../config/cloudinary');
const Receipe = require('../models/Receipe');
const { uploadImage } = require('../utils/uploadImage');

exports.postReceipeImage = async (req, res) => {
    try {
        //find imageFile
        //upload to the specific id
        const { id } = req.body;
        console.log(id);
        const image = req.files.imageFile;
        console.log(image);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }

        cloudinaryConnect();
        const uploadDetails = await uploadImage(image, {
            folder: 'Receipe',
            transformation: [
                { height: 150, crop: "scale" } // Resize the image to a height of 150px, maintaining aspect ratio
            ]
        }); //YAHAN PR IMAGE HEIGHT WALA OPTION DENI H 
        const imageurl = uploadDetails.secure_url;
        const response = await Receipe.findByIdAndUpdate({ _id: id }, { imageUrl: imageurl }, { new: true });

        if (!response) {
            return res.status(401).json({
                success: false,
                message: "Couldn't update  image in db",
                response: response,
            })
        }
        console.log("Image uploaded successfully!");

        return res.status(200).json({
            success: true,
            message: "Image Uploaded successfully!!",
            response: response,

        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while uploading receipe image",
        })
    }
}

exports.postReceipeDetails = async (req, res) => {
    try {
        // Extracting data from the request body
        const { title, shortDescription, cookingTime, difficulty, ingredients, steps } = req.body;

        // Creating a new recipe document in the database
        const response = await Receipe.create({
            title,
            shortDescription,
            difficulty,
            cookingTime,
            ingredients,
            steps,
        });

        // Checking if the creation was successful
        if (!response) {
            return res.status(401).json({
                success: false,
                message: "Couldn't upload recipe details",
                response,
            });
        }

        // Responding with success
        return res.status(200).json({
            success: true,
            message: "Hurray!! Recipe details uploaded successfully",
            response,
        });
    } catch (error) {
        // Handling errors
        return res.status(500).json({
            success: false,
            message: "Error while uploading recipe details",
            error: error.message, // Added .message for cleaner error messages
        });
    }
};

exports.findReceipeDetails = async (req, res) => {
    try {
        //get requrest

        const response = await Receipe.find({});
        if(!response){
            return res.status(401).json({
                success:"false",
                message:"NO receipe found",

            })
        }
        console.log(response);
        return res.status(200).json({
            success: false,
            message: "Successfully fetched receipes",
            response,
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while uploading receipe details",
            error: error
        })
    }
}

