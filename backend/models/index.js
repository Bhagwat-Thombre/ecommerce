const sequelize = require("../config/db");

const User = require("./user");
const Product = require("./product");
const Category = require("./category");
const Brand = require("./brand");
const Cart = require("./cart");
const Order = require("./order");
const Wishlist = require("./wishlist");

// Relations
Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.belongsTo(Brand, { foreignKey: "brandId" });

Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

Order.belongsTo(User, { foreignKey: "userId" });

Wishlist.belongsTo(User, { foreignKey: "userId" });
Wishlist.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  sequelize,
  User,
  Product,
  Category,
  Brand,
  Cart,
  Order,
  Wishlist,
};
