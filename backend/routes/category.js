const express = require("express");
const router = express.Router();

// ❌ REMOVE this (not needed anymore)
// const Category = require("./../db/category");

const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} = require("../handlers/category-handler"); // ✅ Sequelize version

// CREATE
router.post("", async (req, res) => {
  console.log("here");
  let model = req.body;
  let result = await addCategory(model);
  res.send(result);
});

// GET ALL
router.get("", async (req, res) => {
  let result = await getCategories();
  res.send(result);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getCategoryById(id);
  res.send(result);
});

// UPDATE
router.put("/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateCategory(id, model);
  res.send({ message: "updated" });
});

// DELETE
router.delete("/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteCategory(id);
  res.send({ message: "deleted" });
});

module.exports = router;
