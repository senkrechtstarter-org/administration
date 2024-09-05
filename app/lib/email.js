// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: "m039a86d.kasserver.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL_CLIENT,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// });

// const mailOptions = {
//     from: process.env.EMAIL_CLIENT,
//     to: "geonhoyun@gmail.com",
//     subject: "Test email",
//     text: "I swear to God if this works",
// };

// transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//         console.log("Error sending email: ", err);
//     } else console.log("email sent!");
// });
