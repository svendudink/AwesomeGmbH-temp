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
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

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

// Different routes
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
app.use("/signup", signUpRoute);
app.use("/login", loginRoute);
app.use("/employeeList", employeeRoute);
app.use("/upload", uploadRoute);
app.use("/departments", departmentRoute);
