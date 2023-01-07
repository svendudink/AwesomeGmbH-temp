import csvtojsonV2 from "csvtojson";
import xlsConvert from "./XLSConvert.js";
import Employees from "../schema/Employees.js";

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
        console.log("jsonobj", jsonObj);
        controller(jsonObj);
      });
  } catch {
    console.log("toJSONerror");
  }
  return null;
};

const controller = (json) => {
  Employees.insertMany(json)
    .then((value) => {
      console.log("Saved Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default toJSON;
