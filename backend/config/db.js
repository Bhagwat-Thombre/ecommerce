const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "ecommerce",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "1234",
  {
    host: "localhost",
    dialect: "mysql",
  },
);

module.exports = sequelize;
