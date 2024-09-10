import express from "express";
import cors from "cors";
import { connectDB } from "./Config/Db.js";
import userRouter from "./Routes/UserRoute.js";
import foodRouter from "./Routes/foodRoute.js";
import "dotenv/config.js";
import cartRouter from "./Routes/CartRoute.js";
import orderRouter from "./Routes/OrderRoute.js";


// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors()); //access backend from any frontend

//databse connection
connectDB();

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the backend");
});

app.listen(port, () => {
  //http method to request data from server
  console.log(`Server listening at port http://localhost:${port}`);
});
