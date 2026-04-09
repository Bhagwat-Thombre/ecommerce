const Wishlist = require("../models/wishlist");
const Product = require("../models/product");

// ADD TO WISHLIST
async function addToWishlist(userId, productId) {
  const wishlist = await Wishlist.create({
    userId: userId,
    productId: productId,
  });

  return wishlist.toJSON();
}

// REMOVE FROM WISHLIST
async function removeFromWishlist(userId, productId) {
  await Wishlist.destroy({
    where: {
      userId: userId,
      productId: productId,
    },
  });
}

// GET WISHLIST (WITH PRODUCT DETAILS)
async function getWishlist(userId) {
  let wishlists = await Wishlist.findAll({
    where: { userId: userId },
    include: [
      {
        model: Product,
      },
    ],
  });

  return wishlists.map((x) => x.Product); // return only product
}

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
