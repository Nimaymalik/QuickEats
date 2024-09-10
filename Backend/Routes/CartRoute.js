import express from "express";
import authMiddleware from '../Middleware/auth.js'
import { addTocart, getcart, removeFromcart } from "../Controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware,addTocart);
cartRouter.post("/remove", authMiddleware,removeFromcart);
cartRouter.post("/get", authMiddleware,getcart);


export default cartRouter;