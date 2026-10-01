const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");

// Parse JSON request bodies
app.use(express.json());

// Mount product routes
app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
