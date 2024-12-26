
const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide an owner for this product.'],
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this product.'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price for this product.'],
    },
    available: {
        type: Number,
        required: [true, 'Please provide the number of this product available.'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image for this product.'],
    },
    shortDescr: {
        type: String,
        required: [true, 'Please provide a short description for this product.'],
    },
    longDescr: {
        type: String,
        required: [true, 'Please provide a long description for this product.'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category for this product.'],
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
            },
            review: {
                type: String,
            },
        }
    ]
})

module.exports = mongoose.model('Product', ProductSchema);
