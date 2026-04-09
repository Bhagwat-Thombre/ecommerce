const express = require("express");

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../handlers/product-handler"); // ✅ Sequelize version

const router = express.Router();

// CREATE PRODUCT
router.post("/", async (req, res) => {
  let model = req.body;
  let product = await addProduct(model);
  res.send(product);
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateProduct(id, model);
  res.send({ message: "updated" });
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteProduct(id);
  res.send({ message: "deleted" });
});

// GET PRODUCT BY ID
router.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let product = await getProduct(id);
  res.send(product);
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  let products = await getAllProducts();
  res.send(products);
});

module.exports = router;
