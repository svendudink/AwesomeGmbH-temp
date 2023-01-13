import fs from "fs";
import Employees from "../schema/Employees.js";
import Abteilung from "../schema/Departments.js";
import { verifyPriviliges } from "../utils/jwt.js";
import { departments } from "./departmentRegistry.js";

import { xlsxAndCsvToObj } from "../utils/xlsxAndCsvToObj.js";

let privileges = [];

export const upload = async (req, res) => {
  privileges = await verifyPriviliges(req.body.token, res, "departments");

  if (
    !privileges.departmentPrivileges &&
    !privileges.employeePrivileges &&
    !privileges.assignedDepartment
  ) {
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

// receives an array with departments and compares it with mongo, returns all new departments
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

  //Return the different scenarios
  json = await json.map((employee) => {
    // user has employee privileges but no department privileges
    if (!privileges.departmentPrivileges && privileges.employeePrivileges) {
      return {
        ...employee,
        Abteilung: departmentArray.includes(employee.Abteilung)
          ? employee.Abteilung
          : "",
        assignedBy: user,
      };
      //user has all privileges
    } else if (
      (privileges.departmentPrivileges && privileges.employeePrivileges) ||
      privileges.departmentPrivileges
    ) {
      console.log("dps");
      if (
        !departmentArray.includes(employee.Abteilung) &&
        employee.Abteilung !== undefined
      ) {
        newDepartments = [...newDepartments, { abteilung: employee.Abteilung }];
      }

      return {
        ...employee,
        Abteilung: employee.Abteilung ? employee.Abteilung : "",
        assignedBy: user,
      };
      //user has privleges to import data from own department
    } else if (privileges.assignedDepartment) {
      return privileges.assignedDepartment === employee.Abteilung
        ? {
            ...employee,
            Abteilung: departmentArray.includes(employee.Abteilung)
              ? employee.Abteilung
              : "",
            assignedBy: user,
          }
        : "";

      // user has Deparment privileges, but no employee privileges
    }
  });
  //Cleanup after Mapping
  (function () {
    json = json.filter((e) => {
      return e !== "" && e.abteilung !== "undefined";
    });
  })();

  if (privileges.departmentPrivileges) {
    console.log("befoireInswerting", newDepartments);
    Abteilung.insertMany(newDepartments)
      .then((value) => {
        console.log("Departments Saved Successfully");
      })

      .catch((error) => {
        console.log("this", error);
      });
  }

  if (privileges.employeePrivileges || privileges.assignedDepartment) {
    console.log("before inserting employees", json);
    Employees.insertMany(json)
      .then((value) => {
        console.log("Employees Saved Successfully");
      })

      .catch((error) => {
        console.log(error);
      });
  }
};
