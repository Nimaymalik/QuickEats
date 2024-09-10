//connect with the database

import mongoose from "mongoose";

 export const connectDB=async()=>{
  await  mongoose.connect('mongodb+srv://greatstack:33858627@cluster0.vo7yweh.mongodb.net/foodweb').then(()=>console.log("Database connected"));
    

}
