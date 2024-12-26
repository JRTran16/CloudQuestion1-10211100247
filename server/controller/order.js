

const Order = require('../models/order');

const getOrders = async (req, res) => {
    try {
        const filters = req.query
        const orders = await Order.find(filters)
        res.status(200).json({ orders })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

const updateOrder = async (req, res) => {
    try {
        console.log(req.body)
        const { id, status } = req.body
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
        res.status(200).json({ order })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

const placeOrder = async (req, res) => {
    try {
      const { orders } = req.body;
        console.log(orders)
      const results = await Promise.allSettled(
        orders.map(async (order) => {
          try {
            const newOrder = new Order(order);
            return await newOrder.save();
          } catch (error) {
            throw new Error(`Order creation failed for ${order.id || 'unknown'}: ${error.message}`);
          }
        })
      );
  
      const successfulOrders = results
        .filter(result => result.status === "fulfilled")
        .map(result => result.value);
  
      const failedOrders = results
        .filter(result => result.status === "rejected")
        .map(result => result.reason.message);
  
      if (failedOrders.length) {
        console.warn("Some orders failed to be created:", failedOrders);
      }
  
      res.status(201).json({
        message: "Order processing completed.",
        successfulOrders,
        failedOrders, // Include details of any failed orders
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  module.exports = {
    placeOrder,
    getOrders,
    updateOrder,
  };
  