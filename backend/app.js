const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");

const { sequelize } = require("./models");

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");

const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

const seedData = require("./handlers/data-seed"); // 🔥 ADD THIS

app.use(cors());
app.use(express.json());

// ROOT
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ROUTES
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);

// DB CONNECT
sequelize
  .sync()
  .then(async () => {
    console.log("MySQL Connected");

    await seedData(); // 🔥 VERY IMPORTANT

    app.listen(port, () => {
      console.log("Server running on port", port);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });
