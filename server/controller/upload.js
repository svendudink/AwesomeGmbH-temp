import csvtojsonV2 from "csvtojson";
import xlsConvert from "../utils/XLSConvert.js";
import Employees from "../schema/Employees.js";

export const upload = async (req, res) => {
  try {
    if (req.file) {
      res.send({
        status: true,
        message: "File Uploaded!",
      });
    } else {
      res.status(400).send({
        status: false,
        data: "File Not Found :(",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const toJSON = (path) => {
  try {
    path = path.toLowerCase();

    if (("check", path.substr(path.length - 4) === "xlsx")) {
      let jsonObj = [];
      xlsConvert(path);
      path = path.replace(".xlsx", ".csv");

      console.log("path", path);
    }
    csvtojsonV2()
      .fromFile(path)
      .then((jsonObj) => {
        controller(jsonObj);
      });
  } catch {
    console.log("toJSONerror");
  }
  return null;
};

const controller = async (json) => {
  addUploadUser(json);
  Employees.insertMany(json)
    .then((value) => {
      console.log("Saved Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

const addUploadUser = async (json) => {
  console.log(
    json.map((row) => {
      return { ...row, Creator: "Sven" };
    })
  );
};

export default toJSON;
