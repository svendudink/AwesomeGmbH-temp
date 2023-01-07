import express from "express";
import signUpRoute from "./routes/signupRoute.js";
import loginRoute from "./routes/loginRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

/////////////////////////////////////Sven's//Coding/ Date: 05-01-2023 10:11 ////////////
// Config Parameters
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
const port = 8080;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors(corsOptions));

/////////////////////////////////////Sven's//Coding/ Date: 05-01-2023 09:57 ////////////
// MongoDB Login
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection established with mongo");
  } catch (error) {
    console.log("DB error", error);
  }
})();

/////////////////////////////////////Sven's//Coding/ Date: 05-01-2023 10:12 ////////////
// Routes
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

app.use("/signup", signUpRoute);
app.use("/login", loginRoute);
app.use("/upload", uploadRoute);
