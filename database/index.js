const fs = require("fs").promises;
const path = require("path");

const filepath = path.join(__dirname, "db.json");

// Read all products from the JSON file (with simulated delay)
async function readProducts() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const data = await fs.readFile(filepath, "utf-8");
  return JSON.parse(data);
}

// Write products array back to the JSON file
async function writeProducts(products) {
  await fs.writeFile(filepath, JSON.stringify(products, null, 2), "utf-8");
}

module.exports = { readProducts, writeProducts };
