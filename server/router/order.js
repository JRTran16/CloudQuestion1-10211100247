const express = require('express');
const { placeOrder, getOrders, updateOrder } = require('../controller');
const router = express.Router();


router.route('/').post(placeOrder).get(getOrders).patch(updateOrder);

module.exports = router