const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { cacheMiddleware } = require("../middleware/cache");

// GET routes use cacheMiddleware to check cache before hitting controller
router.get("/", cacheMiddleware, productController.getAllProducts);
router.get("/:id", cacheMiddleware, productController.getProductById);

// POST, PUT, PATCH, DELETE go directly to controller (no cache check needed)
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.patch("/:id", productController.patchProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
