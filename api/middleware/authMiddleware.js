import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import UserModel from "../models/userModel.js";

//for logged in users
const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt; //read the jwt from the cookie

  if (token) {
    try {
      //if token exists, verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //set user info in req
      req.user = await UserModel.findById(decoded.userId).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//for admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
