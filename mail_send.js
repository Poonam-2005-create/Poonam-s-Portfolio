require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "pobhosale2005@gmail.com",
    pass: "pymm gwud zfgh pkly", // Use App Password instead of your Gmail password
  },
});

var sendMsg = async function(name, email, msg) {
  const info = await transporter.sendMail({
    from: `"${name}" <${email}>`, // Correct sender format
    to: 'pobhosale2005@gmail.com', // Receiver email
    subject: "From Portfolio Website", // Subject line
    text: msg, // Plain text body
    html: `<p>${msg}</p>`, // HTML formatted message
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendMsg;
