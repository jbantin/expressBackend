import express from "express";
import { sendPasswordResetOTPEmail, resetUserPassword } from "./controller.js";

const router = express.Router();

router.post("/reset", async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    if (!(email && otp && newPassword)) {
      throw Error("Empty credentials are not allowed!");
    }
    await resetUserPassword({ email, otp, newPassword });
    res.status(200).json({ email, passwordreset: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("An email is required");
    }
    const createdPasswordResetOTP = await sendPasswordResetOTPEmail(email);
    res.status(200).json(createdPasswordResetOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
