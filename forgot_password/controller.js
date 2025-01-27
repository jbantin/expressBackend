import { User } from "../database/model.js";
import { sendOTP, verifyOTP, deleteOTP } from "../otp/controller.js";
import { hashData } from "../util/hashData.js";

const resetUserPassword = async ({ email, otp, newPassword }) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Invalid code passed. Check your inbox.");
    }
    if (newPassword.length < 8) {
      throw Error("Password is too short!");
    }
    const hashedNewPassword = await hashData(newPassword);
    await User.updateOne({ email }, { password: hashedNewPassword });
    await deleteOTP(email);
    return;
  } catch (error) {
    throw error;
  }
};

const sendPasswordResetOTPEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw Error("There's no acoount for the provided email.");
    }
    if (!existingUser.verified) {
      throw Error("Email hasn't been verified yet.Check your inbox.");
    }
    const otpDetails = {
      email,
      subject: "Password Reset",
      message: "Enter the code below to reset your password.",
      duration: 1,
    };
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};
export { sendPasswordResetOTPEmail, resetUserPassword };
