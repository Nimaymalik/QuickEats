import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import UserModel from "../Models/UserModel.js";

//loginUser
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not created" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token =createToken(user._id);
    res.json({success:true,token})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"Server Error"})
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//registerUser
const RegisterUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checked the existance of the user
    if (validator.isEmpty(name)) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email format and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }

    if (password.length < 8) {
      return req.json({ success: false, message: "Password is not strong" });
    }

    // // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const User = await newUser.save();
    const token = createToken(User._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { RegisterUser, loginUser };
