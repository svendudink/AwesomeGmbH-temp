import fs from "fs";
import Employees from "../schema/Employees.js";
import { verifyPriviliges } from "../utils/jwt.js";

import { xlsxAndCsvToObj } from "../utils/xlsxAndCsvToObj.js";

export const upload = async (req, res) => {
  console.log(req.file.filename);
  let privileges = await verifyPriviliges(req.body.token, res, "departments");
  console.log(privileges);

  if (!privileges.departmentPrivileges && !privileges.employeePrivileges) {
    console.log("something happened");
    res.status(403).json({
      msg: "Not permitted",
    });
  }

  try {
    const fileName = `uploads/${Date.now()}${req.file.originalname}`;

    fs.rename(`csvuploads/${req.file.filename}`, fileName, function (err) {
      if (err) console.log("ERROR: " + err);
    });
    const json = await xlsxAndCsvToObj(fileName);
    saveToMongoAndAddUser(json, privileges.user);
  } catch {
    console.log("error");
  }
};

const saveToMongoAndAddUser = async (json, user) => {
  json = await json.map((employee) => {
    console.log(employee.Abteilung);
    return {
      ...employee,
      Abteilung: employee.Abteilung ? employee.Abteilung : "",
      assignedBy: user,
    };
  });
  console.log(json);

  Employees.insertMany(json)
    .then((value) => {
      console.log("Saved Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
