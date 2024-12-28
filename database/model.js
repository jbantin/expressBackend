import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
  count: { type: Number, default: 1 },
  data: [Array],
  verified: { type: Boolean, default: false },
});

export const User = mongoose.model("User", UserSchema, "users");
