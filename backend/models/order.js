const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  userId: DataTypes.INTEGER,
  date: DataTypes.DATE,
  items: DataTypes.JSON,
  paymentType: DataTypes.STRING,
  address: DataTypes.JSON,
  status: DataTypes.STRING,
});

module.exports = Order;
