import fs from "fs";
import Employees from "../schema/Employees.js";

import { xlsxAndCsvToObj } from "../utils/xlsxAndCsvToObj.js";

export const upload = async (req, res) => {
  try {
    console.log("req.file", req.file);
    const fileName = `uploads/${Date.now()}${req.file.originalname}`;

    fs.rename(`csvuploads/${req.file.filename}`, fileName, function (err) {
      if (err) console.log("ERROR: " + err);
    });
    const json = await xlsxAndCsvToObj(fileName);
    console.log(json);
  } catch {
    console.log("error");
  }
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

