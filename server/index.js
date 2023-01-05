import express from "express";
import signUpRoute from "./routes/signupRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

const port = 8080;

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

const DataBaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection established with mongo");
  } catch (error) {
    console.log("DB error", error);
  }
};

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

app.use("/signup", signUpRoute);
