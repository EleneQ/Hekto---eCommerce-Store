import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
const port = process.env.PORT || 6000;

connectDB(); //connecting to MongoDB

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//access req.cookie
app.use(cookieParser());

app.listen(port, () => console.log(`Server running on port ${port}`));
