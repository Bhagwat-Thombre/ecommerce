const Order = require("../models/order");

// ADD ORDER
async function addOrder(userId, orderModel) {
  await Order.create({
    ...orderModel,
    userId: userId,
    status: "inprogress",
  });
}

// GET ORDERS OF A CUSTOMER
async function getCustomerOrders(userId) {
  let orders = await Order.findAll({
    where: { userId: userId },
  });

  return orders.map((x) => x.toJSON());
}

// GET ALL ORDERS (ADMIN)
async function getOrders() {
  let orders = await Order.findAll();
  return orders.map((x) => x.toJSON());
}

// UPDATE ORDER STATUS
async function updateOrderStatus(id, status) {
  await Order.update(
    { status: status },
    {
      where: { id: id },
    },
  );
}

module.exports = {
  addOrder,
  getCustomerOrders,
  getOrders,
  updateOrderStatus,
};
