
const { createProduct, getProducts } = require('./product')
const { updateStock } = require('./stock')
const { placeOrder, getOrders, updateOrder } = require('./order')


module.exports = {
    createProduct,
    getProducts,
    updateStock,
    placeOrder,
    getOrders,
    updateOrder
}