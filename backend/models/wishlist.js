const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Wishlist = sequelize.define("Wishlist", {
  userId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
});

module.exports = Wishlist;
