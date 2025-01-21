const Favourite = require('../models/Favourite');

exports.postFavourite = async(req, res)=>{
    try{
        const recipes = req.body;
        console.log("Received Recipe", recipes);
        // const data = savedData.text;
        const response = await Favourite.create({savedDetails: recipes});
        if(!response){
            return res.status(401).json({
                success: false,
                message:"Not added to favourite"
            })
        }
        return res.status(200).json({
            success: true,
            message:"Added to favourites",
            response: response,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Error while saving favourites",
        })
    }

}

exports.getFavourite = async(req, res)=>{
    try{
        const response = await Favourite.find({});
        if(!response){
            if(!response){
                return res.status(401).json({
                    success: false,
                    message:"No data Saved"
                })
            }
        }
        return res.status(200).json({
            success: true,
            message:"Favourite Fetched Successfully",
            response,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Error while fetching favourites",
        })
    }
}

