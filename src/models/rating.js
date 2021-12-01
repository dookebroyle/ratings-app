const mongoose = require('mongoose')
const validator = require('validator')


const ratingSchema = new mongoose.Schema( {
    bookName: {
        type: String, 
        required: true,
        trim: true
    },
    stars: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reviewText: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Rating = mongoose.model('Rating', ratingSchema )

module.exports = Rating