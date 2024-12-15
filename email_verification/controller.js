import { User } from "./../database/model.js";
import { sendOTP } from "../otp/controller.js";

const sendVerificationOTPEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw Error("There's no account for the provided email.");
    }

    const otpDetails = {
      email,
      subject: "Email Verification",
      message: "Verify your email with the code below.",
      duration: 1,
    };
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

export { sendVerificationOTPEmail };
