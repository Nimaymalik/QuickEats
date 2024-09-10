import UserModel from "../Models/UserModel.js";

const addTocart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item addded to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};
const removeFromcart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Remove from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};
const getcart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error getting cart" });
  }
};

export { addTocart, removeFromcart, getcart };
