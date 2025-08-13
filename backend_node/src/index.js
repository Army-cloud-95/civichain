import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";
import { Admin } from "./models/admin.model.js";
import { createAdminId } from "./controllers/admin.controller.js";
import { generateAccessAndRefreshTokens } from "./controllers/user.controller.js";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    const adminCount = await Admin.countDocuments();
    if(adminCount===0){
    const admin = await Admin.create({
        userName: await createAdminId(),
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        createdBy: "system",
    });
    
    const adminSaved = await Admin.findById(admin._id).select("-password -refreshToken");
    if (!adminSaved) {
        throw new ApiError(500, "Something went wrong while creating admin");
    }
    console.log("Admin created");
    }
    console.log(
      `\n MongoDB connected, DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb Connection error", error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error:", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed", err);
  });
/*
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    } catch (error) {
        console,log("Error",error);
        throw error
    }
})()*/
