import nodemailer from "nodemailer";
const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Deine Gmail-Adresse
    pass: process.env.PASS, // Dein App-Passwort oder dein Gmail-Passwort
  },
});

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Connection test failed:", error);
//   } else {
//     console.log("Connection test successful! Server is ready to send emails.");
//   }
// });

const sendEmail = async (mailOptions) => {
  console.log("huhu try to send email");
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw error;
  }
};

export { sendEmail };
