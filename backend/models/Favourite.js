const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    savedDetails: {
        type: Object,
        requried: true,
    }
})

module.exports = mongoose.model('Favourite Schema', favouriteSchema);

