const express = require('express');
const { generateResponse } = require('../controller/GenerateResponse');
const { postReceipeImage, postReceipeDetails, findReceipeDetails } = require('../controller/FindReceipe');
const { getFavourite, postFavourite } = require('../controller/Favourite');
const router = express.Router();


router.get('/', (req, res)=>{
    res.send("Server is running successfully!")
})

router.post('/generateResponse', generateResponse);
router.post('/postReceipeImage', postReceipeImage);
router.post('/postReceipeDetails', postReceipeDetails);
router.get('/getReceipeDetails', findReceipeDetails);
router.get('/getFavourite', getFavourite);
router.post('/postFavourite', postFavourite);



module.exports = router;