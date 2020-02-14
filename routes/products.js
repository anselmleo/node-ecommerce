var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const productController = require('../controllers/productController');

router.get("", productController.getAllProducts);
router.get("/product-categories", productController.getProductCategories);
router.post("", productController.createProduct);
router.post("/product-categories", productController.createProductCategory);
router.get("/product-categories/:id", productController.getOneProductCategory);
router.get("/:id", productController.getOneProduct);

module.exports = router;