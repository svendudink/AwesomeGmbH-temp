/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Entry file for basic paramters, routes and initial connect to mong
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// Imports
import express from "express";
import signUpRoute from "./routes/signupRoute.js";
import loginRoute from "./routes/loginRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import departmentRoute from "./routes/departmentRoute.js";
import verificationRoute from "./routes/verificationRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// initial values
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// Config parameters
const port = 8080;

// Connect to mongo
(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection established with mongo");
  } catch (error) {
    console.log("DB error", error);
  }
})();

// Login to email server
const transport = {
  //this is the authentication for sending email.
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,

  auth: {
    user: process.env.SMTP_TO_EMAIL,
    pass: process.env.SMTP_TO_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Ready to send mail!");
  }
});

// Different routes
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
app.use("/signup", signUpRoute);
app.use("/login", loginRoute);
app.use("/employeeList", employeeRoute);
app.use("/upload", uploadRoute);
app.use("/departments", departmentRoute);
app.use("/verification", verificationRoute);

// exports

export { transporter };
