

const Product = require('../models/product')

const getProducts = async (req, res) => {
    // Product.deleteMany({}).then(() => {
    //     console.log('deleted all products')
    // })
    const filters = req.query
    try {
        const products = await Product.find(filters)
        console.log(products)
        res.status(200).json({ products })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

const getProduct = async (req, res) => {
}


const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileLocation = req.file.location; // S3 file location
    const { owner, name, price, available, shortDescr, longDescr, category } = req.body;
    
    const newProduct = new Product({
        owner, name, price, available, shortDescr, longDescr, category, rating: 0, reviews: [],
        image: fileLocation,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    getProducts,
    getProduct,
    createProduct   
}