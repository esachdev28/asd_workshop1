const { readProducts, writeProducts } = require("../database");

// Get all products
async function getAllProducts() {
  const products = await readProducts();
  return products;
}

// Get a single product by id
async function getProductById(id) {
  const products = await readProducts();
  const product = products.find((p) => p.id === id);
  return product || null;
}

// Create a new product
async function createProduct(productData) {
  const products = await readProducts();
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...productData };
  products.push(newProduct);
  await writeProducts(products);
  return newProduct;
}

// Update a product (full replacement)
async function updateProduct(id, productData) {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { id, ...productData };
  await writeProducts(products);
  return products[index];
}

// Partially update a product
async function patchProduct(id, productData) {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...productData };
  await writeProducts(products);
  return products[index];
}

// Delete a product
async function deleteProduct(id) {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const deleted = products.splice(index, 1)[0];
  await writeProducts(products);
  return deleted;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
