import fs from "fs";
import foodModel from "../Models/foodModel.js";

//add food item

const addfood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
    
  } catch (error) {
    Console.log(error);
    res.json({ success: false, message: "Error in food saving" });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("List not added");
    res.json({ success: false, message: "list not added" });
  }
};

//remove fooditem

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deletion" });
  }
};

export { addfood, listFood, removeFood };
