const Category = require("../models/category");

// ADD CATEGORY
async function addCategory(model) {
  let category = await Category.create({
    name: model.name,
  });
  return category.toJSON();
}

// GET ALL CATEGORIES
async function getCategories() {
  let categories = await Category.findAll();
  return categories.map((c) => c.toJSON());
}

// GET CATEGORY BY ID
async function getCategoryById(id) {
  let category = await Category.findByPk(id);
  return category ? category.toJSON() : null;
}

// UPDATE CATEGORY
async function updateCategory(id, model) {
  await Category.update(model, {
    where: { id: id },
  });
  return;
}

// DELETE CATEGORY
async function deleteCategory(id) {
  await Category.destroy({
    where: { id: id },
  });
  return;
}

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
};
