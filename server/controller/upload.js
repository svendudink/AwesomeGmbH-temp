import fs from "fs";
import Employees from "../schema/Employees.js";
import Abteilung from "../schema/Departments.js";
import { verifyPriviliges } from "../utils/jwt.js";
import { departments } from "./departmentRegistry.js";

import { xlsxAndCsvToObj } from "../utils/xlsxAndCsvToObj.js";

let privileges = [];

export const upload = async (req, res) => {
  console.log(req.file.filename);
  privileges = await verifyPriviliges(req.body.token, res, "departments");
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

// const checkPermissionLogic = async (department) => {
//   const reqObj = { internal: true, data: "none" };
//   const departmentArray = await departments(reqObj);

//   const result = departmentArray.filter((dep) => {
//     if (dep.abteilung === department) {
//       return dep.abteilung;
//     }
//   });
//   if (result.length) {
//     console.log(result[0].abteilung);
//     return result[0].abteilung;
//   } else return "";
// };

const departmentReturn = async (department) => {
  const reqObj = { internal: true, data: "none" };
  const departmentArray = await departments(reqObj);

  const result = departmentArray.map((dep) => {
    return dep.abteilung;
  });
  return result;
};

const saveToMongoAndAddUser = async (json, user) => {
  const departmentArray = await departmentReturn();
  let newDepartments = [];

  json = await json.map((employee) => {
    if (!privileges.departmentPrivileges && privileges.employeePrivileges) {
      console.log("nodep");
      return {
        ...employee,
        Abteilung: departmentArray.includes(employee.Abteilung)
          ? employee.Abteilung
          : "",
        assignedBy: user,
      };
    } else if (
      privileges.departmentPrivileges &&
      privileges.employeePrivileges
    ) {
      console.log("maxpriv");
      if (
        !departmentArray.includes(employee.Abteilung) &&
        employee.Abteilung !== undefined
      ) {
        console.log(
          "depaertmentArray",
          departmentArray,
          "employee.Abteilung",
          employee.Abteilung
        );
        newDepartments = [...newDepartments, { abteilung: employee.Abteilung }];
      }
      return {
        ...employee,
        Abteilung: employee.Abteilung ? employee.Abteilung : "",
        assignedBy: user,
      };
    }
  });

  if (privileges.departmentPrivileges) {
    console.log(newDepartments);
    Abteilung.insertMany(newDepartments)
      .then((value) => {
        console.log("Departments Saved Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (privileges.employeePrivileges) {
    console.log(json);
    Employees.insertMany(json)
      .then((value) => {
        console.log("Employees Saved Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
