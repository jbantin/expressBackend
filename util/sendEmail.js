import nodemailer from "nodemailer";
const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.web.de", // web.de SMTP server
  port: 465, // Port for SSL
  secure: true, // Use SSL
  auth: {
    user: AUTH_EMAIL, // Your web.de email address
    pass: AUTH_PASS, // Your web.de email password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Connection test failed:", error);
  } else {
    console.log("Connection test successful! Server is ready to send emails.");
  }
});

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
