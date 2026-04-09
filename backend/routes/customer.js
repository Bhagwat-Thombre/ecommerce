const express = require("express");

const {
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
  getProduct,
} = require("../handlers/product-handler");

const { getCategories } = require("../handlers/category-handler");

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../handlers/wishlist-handler");

const {
  getCartItems,
  addToCart,
  removefromCart,
  clearCart,
} = require("../handlers/shopping-cart-handel");

const { getBrands } = require("../handlers/brand-handler");

const { addOrder, getCustomerOrders } = require("../handlers/order-handler");

const router = express.Router();

// NEW PRODUCTS
router.get("/new-products", async (req, res) => {
  const products = await getNewProducts();
  res.send(products);
});

// FEATURED PRODUCTS
router.get("/featured-products", async (req, res) => {
  const products = await getFeaturedProducts();
  res.send(products);
});

// CATEGORIES
router.get("/categories", async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

// BRANDS
router.get("/brands", async (req, res) => {
  const brands = await getBrands();
  res.send(brands);
});

// PRODUCT LISTING
router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, sortBy, sortOrder, brandId, pageSize, page } =
    req.query;

  const products = await getProductForListing(
    searchTerm,
    categoryId,
    page,
    pageSize,
    sortBy,
    sortOrder,
    brandId,
  );

  res.send(products);
});

// SINGLE PRODUCT
router.get("/product/:id", async (req, res) => {
  const id = req.params["id"];
  const product = await getProduct(id);
  res.send(product);
});

// ================= WISHLIST =================

// GET WISHLIST
router.get("/wishlists", async (req, res) => {
  const userId = req.user.id;
  const items = await getWishlist(userId);
  res.send(items);
});

// ADD TO WISHLIST
router.post("/wishlists/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const item = await addToWishlist(userId, productId);
  res.send(item);
});

// REMOVE FROM WISHLIST
router.delete("/wishlists/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  await removeFromWishlist(userId, productId);
  res.send({ message: "ok" });
});

// ================= CART =================

// GET CART
router.get("/carts", async (req, res) => {
  const userId = req.user.id;
  const items = await getCartItems(userId);
  res.send(items);
});

// ADD TO CART
router.post("/carts/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const quantity = req.body.quantity;
  const items = await addToCart(userId, productId, quantity);
  res.send(items);
});

// REMOVE FROM CART
router.delete("/carts/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const items = await removefromCart(userId, productId);
  res.send(items);
});

// ================= ORDER =================

// CREATE ORDER
router.post("/order", async (req, res) => {
  const userId = req.user.id;
  const order = req.body;

  await addOrder(userId, order);
  await clearCart(userId);

  return res.send({
    message: "Order Created",
  });
});

// GET CUSTOMER ORDERS
router.get("/orders", async (req, res) => {
  const userId = req.user.id;
  const orders = await getCustomerOrders(userId);
  return res.send(orders);
});

module.exports = router;
