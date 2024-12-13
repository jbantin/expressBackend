import { OTP } from "./model.js";
import { generateOTP } from "../util/generateOTP.js";
import { sendEmail } from "../util/sendEmail.js";
import { hashData } from "../util/hashData.js";
const { AUTH_EMAIL } = process.env;
const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw Error("Provide values for email,subject,message");
    }

    await OTP.deleteOne({ email });

    const generatedOTP = await generateOTP();

    const mailOptions = {
      from: AUTH_EMAIL,
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
export { sendOTP };
