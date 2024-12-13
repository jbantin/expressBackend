import nodemailer from "nodemailer";
const { AUTH_EMAIL, AUTH_PASS } = process.env;
let transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  auth: {
    user: "smtp@mailtrap.io",
    pass: AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
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
