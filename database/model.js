import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
});

export const User = mongoose.model("User", UserSchema, "users");
