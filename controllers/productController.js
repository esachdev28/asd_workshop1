const productService = require("../services/productService");
const { setCache, invalidateCache } = require("../middleware/cache");

// GET /products
async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    setCache(req.originalUrl, products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to read products" });
  }
}

// GET /products/:id
async function getProductById(req, res) {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    setCache(req.originalUrl, product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to read products" });
  }
}

// POST /products
async function createProduct(req, res) {
  try {
    const newProduct = await productService.createProduct(req.body);
    invalidateCache();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
}

// PUT /products/:id
async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const updated = await productService.updateProduct(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    invalidateCache();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
}

// PATCH /products/:id
async function patchProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const patched = await productService.patchProduct(id, req.body);

    if (!patched) {
      return res.status(404).json({ error: "Product not found" });
    }

    invalidateCache();
    res.json(patched);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
}

// DELETE /products/:id
async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    invalidateCache();
    res.json({ message: "Product deleted", product: deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
