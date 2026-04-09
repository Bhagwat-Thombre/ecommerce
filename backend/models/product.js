const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  name: DataTypes.STRING,
  shortDescription: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  discount: DataTypes.FLOAT,
  images: DataTypes.JSON,
  categoryId: DataTypes.INTEGER,
  brandId: DataTypes.INTEGER,
  isFeatured: DataTypes.BOOLEAN,
  isNewProduct: DataTypes.BOOLEAN,
});

module.exports = Product;
