
const Product = require("../models/Product");
const Category = require("../models/Category");

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById({ _id: id }, function (err, data) {
      if (err) {
        // throw err;
        console.log(err);
      }
      return data;
    });

    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully!",
      data: product  
    });

  } catch (err) {
    res.status(400).send({
      status: "fail",
      message: err.message
    });
  }
}

const createProduct = async (req, res) => {
  try {
    const { product_name, price, category_id } = req.body;

    console.log(product_name);

    const product = new Product({
      productName: product_name,
      price
    });

    category = await Category.findById(category_id);

    product.category = category;

    await product.save();

    
    return res.status(200).send({
      status: "success",
      message: "product created successfully",
      product: product
    })

  } catch (err) {
    return res.status(500).send({
      status: "fail",
      message: err.message
    })
  }
  
}

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).send({
      status: "success",
      data: allProducts
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      status: "fail",
      message: err.message
    });
  }
};

const getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await Category.find({});
    return res.status(200).send({
      status: "success",
      data: productCategories
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      status: "fail",
      message: err.message
    }); 
  }
};


const createProductCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    console.log(category_name);

    const category = new Category({
      categoryName: category_name
    });

    category.save();
    res.status(200).send({
      status: "success",
      message: "Successfully created category",
      data: category
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "fail",
      message: "Error saving category"
    });
  }
};

const getOneProductCategory = async (req, res) => {
  
  const { id } = req.params

  try {
    const productCategory = await Category.findById({ _id: id }, (err, data) => {
      if (err)
        console.log(err);
      return data;
    });

    if (!productCategory) {
      return res.status(400).send({
        status: "fail",
        message: "category does not exist"
      });
    }
    

    res.status(200).send({
      status: "success",
      data: productCategory
    });
  } catch (err) {
    res.status(400).send({
      status: "fail",
      message: err.message
    });
  }
};

module.exports = {
  getOneProduct,
  getAllProducts,
  getOneProductCategory,
  getAllProductCategories,
  createProductCategory,
  createProduct
};

