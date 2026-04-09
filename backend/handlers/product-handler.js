const Product = require("../models/product");
const { Op } = require("sequelize");

// ADD PRODUCT
async function addProduct(model) {
  let product = await Product.create({
    ...model,
  });
  return product.toJSON();
}

// UPDATE PRODUCT
async function updateProduct(id, model) {
  await Product.update(model, {
    where: { id: id },
  });
}

// DELETE PRODUCT
async function deleteProduct(id) {
  await Product.destroy({
    where: { id: id },
  });
}

// GET ALL PRODUCTS
async function getAllProducts() {
  let products = await Product.findAll();
  return products.map((x) => x.toJSON());
}

// GET SINGLE PRODUCT
async function getProduct(id) {
  let product = await Product.findByPk(id);
  return product ? product.toJSON() : null;
}

// GET NEW PRODUCTS
async function getNewProducts() {
  let newProducts = await Product.findAll({
    where: { isNewProduct: true },
  });
  return newProducts.map((x) => x.toJSON());
}

// GET FEATURED PRODUCTS
async function getFeaturedProducts() {
  let featuredProducts = await Product.findAll({
    where: { isFeatured: true },
  });
  return featuredProducts.map((x) => x.toJSON());
}

// PRODUCT LISTING (SEARCH + FILTER + PAGINATION + SORT)
async function getProductForListing(
  searchTerm,
  categoryId,
  page,
  pageSize,
  sortBy,
  sortOrder,
  brandId,
) {
  if (!sortBy) {
    sortBy = "price";
  }

  if (!sortOrder) {
    sortOrder = "DESC"; // Mongo -1 → DESC
  } else {
    sortOrder = sortOrder == -1 ? "DESC" : "ASC";
  }

  let where = {};

  // SEARCH
  if (searchTerm) {
    where[Op.or] = [
      {
        name: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      {
        shortDescription: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    ];
  }

  // FILTER
  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (brandId) {
    where.brandId = brandId;
  }

  console.log("queryFilter", where);

  const products = await Product.findAll({
    where: where,
    order: [[sortBy, sortOrder]],
    offset: (+page - 1) * +pageSize,
    limit: +pageSize,
  });

  return products.map((x) => x.toJSON());
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
};
