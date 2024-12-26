
const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide an owner for this order.'],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Please provide a product ID.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide the ordered quantify for this product.'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide the price for this product.'],
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the customer name.'],
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'delivered'],
        default: 'pending',
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    delivered: {
        type: Date,
    }
});

module.exports = mongoose.model('Order', OrderSchema);