import express from "express";
import { sendVerificationOTPEmail } from "./controller.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("An email is required!");
    }

    const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);

    res.status(200).json(createdEmailVerificationOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
