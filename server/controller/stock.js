const Product = require('../models/product');

const updateStock = async (req, res) => {
  console.log("----------- updating stock -----------");
  try {
    const { products } = req.body;
    console.log(products);

    // Using mongoose to update stock
    const results = await Promise.all(
      products.map(async (product) => {
        try {
          return await Product.findByIdAndUpdate(
            product._id,
            { available: product.available },
            { new: true } 
          );
        } catch (error) {
          return { error: error.message, productId: product._id }; 
        }
      })
    );

    res.status(200).json({ message: "Stock updated successfully", results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateStock,
};
