var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const productController = require('../controllers/productController');

router.get("", auth, productController.getAllProducts);
router.get("/product-categories", auth, productController.getAllProductCategories);
router.post("", auth, productController.createProduct);
router.post("/product-categories", auth, productController.createProductCategory);
router.get("/product-categories/:id", auth, productController.getOneProductCategory);
router.get("/:id", auth, productController.getOneProduct);

module.exports = router;