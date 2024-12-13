import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const { MONGODB_URI } = process.env;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connectToDB();
