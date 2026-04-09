const User = require("../models/user"); // Sequelize model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER USER
async function registerUser(model) {
  const hashPassword = await bcrypt.hash(model.password, 10);

  await User.create({
    name: model.name,
    email: model.email,
    password: hashPassword,
  });
}

// LOGIN USER
async function loginUser(model) {
  const user = await User.findOne({
    where: { email: model.email },
  });

  if (!user) {
    return null;
  }

  console.log(user, model.password, user.password);

  const isMatched = await bcrypt.compare(model.password, user.password);

  if (isMatched) {
    const token = jwt.sign(
      {
        id: user.id, // 🔁 changed from _id → id
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "seceret",
      {
        expiresIn: "50h",
      },
    );

    return { token, user };
  } else {
    return null;
  }
}

module.exports = { registerUser, loginUser };
