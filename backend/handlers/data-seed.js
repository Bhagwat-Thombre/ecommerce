const Brand = require("../models/brand");
const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");

const bcrypt = require("bcrypt");

async function seedData() {
  // USER
  var userCount = await User.count();
  console.log("User count:", userCount);
  if (userCount == 0) {
    let userModel = {
      name: "admin",
      password: "12345",
      email: "admin@test.com",
    };

    const hashPassword = await bcrypt.hash(userModel.password, 10);

    await User.create({
      name: userModel.name,
      email: userModel.email,
      password: hashPassword,
      isAdmin: true,
    });

    console.log("user inserted");
  }

  // CATEGORY
  var categoryCount = await Category.count();
  if (categoryCount == 0) {
    await Category.bulkCreate([{ name: "Category 1" }, { name: "Category 2" }]);

    console.log("category inserted");
  }

  // BRAND
  var brandCount = await Brand.count();
  if (brandCount == 0) {
    await Brand.bulkCreate([{ name: "Brand 1" }, { name: "Brand 2" }]);

    console.log("brand inserted");
  }

  // PRODUCT
  var productCount = await Product.count();
  if (productCount == 0) {
    const category = await Category.findOne();
    const brand = await Brand.findOne();

    const categoryId = category.id; // 🔁 changed
    const brandId = brand.id; // 🔁 changed

    await Product.bulkCreate([
      {
        name: "Product 1",
        shortDescription:
          "Product 1 shortDescription shortDescription shortDescription",
        description:
          "Product 1 Description Description Description Product 1 Description Description Description",
        price: 500,
        discount: 10,
        images: [
          "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/j/a/b/-original-imah83eztbdcsknu.jpeg?q=70&crop=false",
        ],
        categoryId: categoryId,
        brandId: brandId,
        isFeatured: true,
        isNewProduct: true,
      },
      {
        name: "Product 2",
        shortDescription:
          "Product 2 shortDescription shortDescription shortDescription",
        description:
          "Product 2 Description Description Description Product 2 Description Description Description",
        price: 900,
        discount: 20,
        images: [
          "https://rukminim2.flixcart.com/image/416/416/xif0q/cases-covers/back-cover/i/f/o/ipky-mtog055g-kwine-case-original-imah87fwnhrqmg3b.jpeg?q=70&crop=false",
        ],
        categoryId: categoryId,
        brandId: brandId,
        isFeatured: true,
        isNewProduct: true,
      },
      {
        name: "Product 3",
        shortDescription:
          "Product 3 shortDescription shortDescription shortDescription",
        description:
          "Product 3 Description Description Description Product 3 Description Description Description",
        price: 500,
        discount: 0,
        images: [
          "https://rukminim2.flixcart.com/image/416/416/xif0q/cases-covers/back-cover/j/l/e/nn-candy-rd-12-5g-5-flipkart-smartbuy-original-imah895yqm2z7quh.jpeg?q=70&crop=false",
        ],
        categoryId: categoryId,
        brandId: brandId,
        isFeatured: true,
        isNewProduct: true,
      },
      {
        name: "Product 4",
        shortDescription:
          "Product 4 shortDescription shortDescription shortDescription",
        description:
          "Product 4 Description Description Description Product 4 Description Description Description",
        price: 500,
        discount: 0,
        images: [
          "https://rukminim2.flixcart.com/image/832/832/kdrpksw0-0/shirt/5/n/r/40-441001732med-grey-john-players-original-imafuhzjamfkfret.jpeg?q=70&crop=false",
        ],
        categoryId: categoryId,
        brandId: brandId,
        isFeatured: true,
        isNewProduct: true,
      },
    ]);

    console.log("product inserted");
  }
}

module.exports = seedData;
