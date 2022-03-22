import express from "express";
import User from './Models/UserModel.js';
import users from './data/users.js';
import Product from './Models/ProductModel.js';
import product from './data/Products.js';
import expressAsyncHandler from "express-async-handler";


const ImportData = express.Router();

ImportData.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    await User.deleteOne({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/products",
  expressAsyncHandler(async (req, res) => {
    await Product.deleteOne({});
    const importProducts = await Product.insertMany(product);
    res.send({ importProducts });
  })



);

export default ImportData;
