const express = require("express");
const {
  addBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getBrands,
} = require("../handlers/brand-handler"); // ✅ already converted to Sequelize

const router = express.Router();

// CREATE
router.post("", async (req, res) => {
  console.log("here");
  let model = req.body;
  let result = await addBrand(model);
  res.send(result);
});

// UPDATE
router.put("/:id", async (req, res) => {
  console.log("here");
  let model = req.body;
  let id = req.params["id"];
  await updateBrand(id, model);
  res.send({ message: "updated" });
});

// DELETE
router.delete("/:id", async (req, res) => {
  console.log("here");
  let id = req.params["id"];
  await deleteBrand(id);
  res.send({ message: "deleted" });
});

// GET BY ID
router.get("/:id", async (req, res) => {
  console.log("here");
  let id = req.params["id"];
  let brand = await getBrand(id);
  res.send(brand);
});

// GET ALL
router.get("", async (req, res) => {
  console.log("here");
  let brands = await getBrands();
  res.send(brands);
});

module.exports = router;
