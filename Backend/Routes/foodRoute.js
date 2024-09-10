import express from "express";
//use to create image storage system
import multer from "multer";
import { addfood, listFood, removeFood } from "../Controller/foodController.js";


const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`)
  }
});

const upload =multer({storage:storage})

//used to uplaod the image in the uplaods folder
foodRouter.post("/add",upload.single("image"), addfood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);

export default  foodRouter ;
