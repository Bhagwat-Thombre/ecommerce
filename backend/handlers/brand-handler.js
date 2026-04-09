const Brand = require("../models/brand");

// GET ALL BRANDS
async function getBrands() {
  let brands = await Brand.findAll();
  return brands.map((x) => x.toJSON());
}

// GET SINGLE BRAND
async function getBrand(id) {
  let brand = await Brand.findByPk(id);
  return brand ? brand.toJSON() : null;
}

// ADD BRAND
async function addBrand(model) {
  let brand = await Brand.create({
    name: model.name,
  });
  return brand.toJSON();
}

// UPDATE BRAND
async function updateBrand(id, model) {
  await Brand.update(model, {
    where: { id: id },
  });
}

// DELETE BRAND
async function deleteBrand(id) {
  await Brand.destroy({
    where: { id: id },
  });
}

module.exports = {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
};
