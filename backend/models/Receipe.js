const mongoose = require('mongoose');

const receipeSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    steps: {
        type: [String],
        required: true,
    },
})

module.exports = mongoose.model('Receipe Schema', receipeSchema);