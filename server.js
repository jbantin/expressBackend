import express from "express";
import Gemini from "./gemini.js";
import cors from "cors";
import "./database/db.js";
import { createNewUser, authenticateUser } from "./database/controller.js";
import { verifyToken } from "./middleware/auth.js";
import OTPRoutes from "./otp/routes.js";
import emailVerificationRoutes from "./email_verification/routes.js";
import { sendVerificationOTPEmail } from "./email_verification/controller.js";
import ForgotPasswordRoutes from "./forgot_password/routes.js";
const app = express();

const port = 2423;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/greeting", (req, res) => {
  res.send("oi koile");
});
app.post("/prompt", verifyToken, (req, res) => {
  Gemini(req.body.prompt).then((response) => {
    res.send(response);
  });
});

app.get("/private", verifyToken, (req, res) => {
  res
    .status(200)
    .send(`You are in the private area of ${req.currentUser.email}`);
});
app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (!email && password) {
      throw Error("Empty credentials supplied!");
    }
    const authenticatedUser = await authenticateUser({ email, password });
    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.post("/sign_up", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    console.log(name, email, password);
    if (!(name && email && password)) throw Error("Empty input fields!");
    else if (!/^[a-zA-z ]*$/.test(name)) {
      throw Error("Invalid name entered!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered!");
    } else if (password.length < 8) {
      throw Error("Password is to short");
    }
    const msg = await createNewUser({ name, email, password });
    await sendVerificationOTPEmail(email);
    res.status(200).json(msg);
  } catch (error) {
    res.status(400).send(error.message);
  }
  app.use("/forgot_password", ForgotPasswordRoutes);
  app.use("/otp", OTPRoutes);
  app.use("/email_verification", emailVerificationRoutes);
});

app.use("*", (_, res) => {
  res.send("<h1>Not found!</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
