import { OTP } from "./model.js";
import { generateOTP } from "../util/generateOTP.js";
import { sendEmail } from "../util/sendEmail.js";
import { hashData, verifyHashedData } from "../util/hashData.js";
const { AUTH_EMAIL } = process.env;

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!(email && otp)) {
      throw Error("Provide values for email,otp");
    }
    const matchedOTPRecord = await OTP.findOne({ email });
    if (!matchedOTPRecord) {
      throw Error("No otp records found.");
    }

    const { expiresAt } = matchedOTPRecord;

    if (expiresAt < Date.now()) {
      throw Error("otp expired.Request for a new one.");
    }

    const hashedOTP = matchedOTPRecord.otp;
    const validOtp = await verifyHashedData(otp, hashedOTP);
    return validOtp;
  } catch (error) {
    throw error;
  }
};

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw Error("Provide values for email,subject,message");
    }

    await OTP.deleteOne({ email });

    const generatedOTP = await generateOTP();

    const mailOptions = {
      from: "horstholler6@gmail.com",
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b></p>`,
    };
    await sendEmail(mailOptions);

    const hashedOTP = await hashData(generatedOTP);
    const newOTP = new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });
    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    throw error;
  }
};
const deleteOTP = async (email) => {
  try {
    await OTP.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};
export { sendOTP, verifyOTP, deleteOTP };
