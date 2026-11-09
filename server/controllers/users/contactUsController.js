const nodemailer = require("nodemailer");
const validator = require("validator");
require("dotenv").config();

const contactUsController = async (req, res) => {
  console.log("contactUsController here", req?.body);

  // send mail with defined transport object is start from here
  try {
    if (
      Object.keys(req?.body)?.length == 0 ||
      !req?.body?.username ||
      !req?.body?.email ||
      !req?.body?.description
    ) {
      return res.json({ status: 500, message: "invalid request" });
    }
    // Ensure fields are strings
    if (
      typeof req?.body?.username !== "string" ||
      typeof req?.body?.email !== "string" ||
      typeof req?.body?.description !== "string"
    ) {
      return res.status(400).json({
        status: 500,
        message: "Invalid input data.",
      });
    }
    const cleanUserName = req?.body?.username.trim();
    const cleanEmail = req?.body?.email.trim();
    const cleanDescription = req?.body?.description.trim();
    if (!cleanUserName || !cleanEmail || !cleanDescription) {
      return res.json({ status: 500, message: "invalid data" });
    }

    // Email format validation start here
    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({
        status: 500,
        message: "Please provide a valid email address.",
      });
    }
    // Email format validation end here

    //     // Prevent invalid email header values
    if (/[\r\n]/.test(cleanEmail)) {
      return res.json({
        status: 500,
        message: "Invalid email address.",
      });
    }

    // craete a connetion emtp server is start from here
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SMTP_BUISNESS_OWNER_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    // craete a connetion emtp server is end here
    await transporter.verify();

    const info = await transporter.sendMail({
      from: { name: req.body.username, address: req?.body?.email }, // sender address
      to: "arslanz499@gmail.com", // list of receivers
      subject: "Mail ✔", // Subject line
      // text: "my mail", // plain text body
      html: `<b>${req.body.message}</b>`, // html body
    });

    //   console.log("Message sent: %s", info);
    if (info?.rejected?.length == 0) {
      return res.json({ status: 200, message: "Email send sucessfully" });
    }
    if (info?.rejected?.length == 1) {
      return res.json({ status: 200, message: "Email is not send" });
    }
    // send mail with defined transport object is end here
  } catch (error) {
    console.log("contactUsController error", error?.message);
    res.json({ status: 500, message: "server error" });
  }
};

module.exports = { contactUsController };

// chatgpt email controller file

// const transporter = require("../config/email");
// const validator = require("validator");

// // Escape HTML to prevent HTML injection
// const escapeHTML = (value) => {
//   return value.replace(/[&<>"']/g, (char) => {
//     const entities = {
//       "&": "&amp;",
//       "<": "&lt;",
//       ">": "&gt;",
//       '"': "&quot;",
//       "'": "&#39;",
//     };

//     return entities[char];
//   });
// };

// const sendContactEmail = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body || {};

//     // Required field validation
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required.",
//       });
//     }

//     // Ensure fields are strings
//     if (
//       typeof name !== "string" ||
//       typeof email !== "string" ||
//       typeof subject !== "string" ||
//       typeof message !== "string"
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid input data.",
//       });
//     }

//     const cleanName = name.trim();
//     const cleanEmail = email.trim();
//     const cleanSubject = subject.trim();
//     const cleanMessage = message.trim();

//     // Length validation
//     if (
//       cleanName.length < 2 ||
//       cleanName.length > 100 ||
//       cleanSubject.length < 3 ||
//       cleanSubject.length > 150 ||
//       cleanMessage.length < 10 ||
//       cleanMessage.length > 5000
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide valid contact information.",
//       });
//     }

//     // Email validation
//     if (!validator.isEmail(cleanEmail)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid email address.",
//       });
//     }

//     // Prevent invalid email header values
//     if (/[\r\n]/.test(cleanEmail)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email address.",
//       });
//     }

//     // Escape user-provided HTML
//     const safeName = escapeHTML(cleanName);
//     const safeEmail = escapeHTML(cleanEmail);
//     const safeSubject = escapeHTML(cleanSubject);
//     const safeMessage = escapeHTML(cleanMessage);

//     const mailOptions = {
//       from: {
//         name: "Website Contact Form",
//         address: process.env.SMTP_USER,
//       },

//       to: process.env.CONTACT_EMAIL,

//       replyTo: cleanEmail,

//       subject: `Contact Form: ${cleanSubject}`,

//       text: `
// New Contact Form Message

// Name: ${cleanName}
// Email: ${cleanEmail}
// Subject: ${cleanSubject}

// Message:
// ${cleanMessage}
//       `,

//       html: `
//         <!DOCTYPE html>
//         <html>
//           <body style="font-family: Arial, sans-serif; color: #333;">

//             <h2>New Contact Form Message</h2>

//             <p><strong>Name:</strong> ${safeName}</p>

//             <p><strong>Email:</strong> ${safeEmail}</p>

//             <p><strong>Subject:</strong> ${safeSubject}</p>

//             <h3>Message:</h3>

//             <p style="white-space: pre-wrap;">
//               ${safeMessage}
//             </p>

//           </body>
//         </html>
//       `,
//     };

//     // Send email
//     const info = await transporter.sendMail(mailOptions);

//     console.log("Contact email sent:", info.messageId);

//     return res.status(200).json({
//       success: true,
//       message: "Your message has been sent successfully.",
//     });

//   } catch (error) {
//     console.error("Contact email error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to send your message. Please try again later.",
//     });
//   }
// };

// module.exports = { sendContactEmail };
