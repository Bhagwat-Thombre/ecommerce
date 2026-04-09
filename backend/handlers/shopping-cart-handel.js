const Cart = require("../models/cart");
const Product = require("../models/product");

// ADD TO CART
async function addToCart(userId, productId, quantity) {
  let product = await Cart.findOne({
    where: { userId: userId, productId: productId },
  });

  if (product) {
    if (product.quantity + quantity <= 0) {
      await removefromCart(userId, productId);
    } else {
      await Cart.update(
        { quantity: product.quantity + quantity },
        {
          where: { id: product.id }, // 🔁 _id → id
        },
      );
    }
  } else {
    await Cart.create({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
  }
}

// REMOVE FROM CART
async function removefromCart(userId, productId) {
  await Cart.destroy({
    where: { userId: userId, productId: productId },
  });
}

// GET CART ITEMS (WITH PRODUCT DETAILS)
async function getCartItems(userId) {
  const products = await Cart.findAll({
    where: { userId: userId },
    include: [
      {
        model: Product,
      },
    ],
  });

  return products.map((x) => {
    return {
      quantity: x.quantity,
      product: x.Product, // Sequelize returns related model like this
    };
  });
}

// CLEAR CART
async function clearCart(userId) {
  await Cart.destroy({
    where: { userId: userId },
  });
}

module.exports = {
  getCartItems,
  addToCart,
  removefromCart,
  clearCart,
};
