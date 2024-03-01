import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import categories from "./data/categories.js";
import UserModel from "./models/userModel.js";
import ProductModel from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Category from "./models/categoryModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await UserModel.deleteMany();
    await ProductModel.deleteMany();
    await Category.deleteMany();

    //put all users into the db
    const createUsers = await UserModel.insertMany(users);
    const adminUser = createUsers[0]._id;

    const sampleProducts = products.map((product) => {
      //all the products are created by the admin user
      return { ...product, user: adminUser };
    });

    await ProductModel.insertMany(sampleProducts);
    await Category.insertMany(categories);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await UserModel.deleteMany();
    await ProductModel.deleteMany();
    await Category.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
