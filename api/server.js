import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
const port = process.env.PORT || 6000;

connectDB(); //connecting to MongoDB

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//access req.cookie
app.use(cookieParser());

//routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/checkout", stripeRoutes);

//image uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  //set static react build folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  //any non-api route will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API running...");
  });
}

//error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
