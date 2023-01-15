import fs from "fs";
import Employees from "../schema/Employees.js";
import Abteilung from "../schema/Departments.js";
import { verifyPriviliges } from "../utils/jwt.js";
import { departments } from "./departmentRegistry.js";
import path from "path";
import { employeeRegistry } from "./employeeRegistry.js";
import { xlsxAndCsvToObj } from "../utils/xlsxAndCsvToObj.js";
import { CheckIfCompatible } from "../utils/checkifCOmpatible.js";
import { amountToBeValid } from "../config/config.js";

let privileges = [];
let counter = { departments: "", employees: "" };

export const upload = async (req, res) => {
  privileges = await verifyPriviliges(req.body.token);

  // No privileges, extra security layer but in general should not happen since allready filtered in React
  if (privileges.none) {
    console.log("something happened");
    res.json({ error: "You dont have permission to change rows" });
  }

  try {
    // Change from Multer filename to original filename
    const fileName = `${req.file.originalname}`;
    fs.rename(
      `uploads/${req.file.filename}`,
      `uploads/${fileName}`,
      function (err) {
        if (err) console.log("ERROR: " + err);
      }
    );
    // Converts XLSX and CSV into an object
    const json = await xlsxAndCsvToObj(fileName);

    //check if document is usable
    const check = await CheckIfCompatible(json, amountToBeValid);
    if (check) {
      return res.status(200).send({
        msg: `your file does not match the criteria, \nat least ${amountToBeValid} collum${
          amountToBeValid >= 2 ? "s" : ""
        } needs to match`,
      });
    } else {
      // Saves to mongo and gets back counter saying how many employees have been added
      const counter = await saveToMongoAndAddUser(json, privileges.user);
      // Deletes file after being processed
      deleteFile(fileName);

      //return messages in different scenarios

      // User with all privileges
      if (privileges.all) {
        res.status(200).send({
          msg: `Employees added: ${counter.employees}\nDepartments added: ${
            counter.departments
          }\n\n${
            json.length !== counter.employees
              ? ` ${
                  json.length - counter.employees
                } entries where skipped, Identical entries are not added`
              : ""
          }`,
        });
        //user with privlegesd to modify employee fileds only
      } else if (privileges.employeeOnly) {
        res.status(200).send({
          msg: `Employees added: ${counter.employees}.${
            json.length !== counter.employees
              ? ` ${
                  json.length - counter.employees
                } entries where skipped, Identical entries are not added`
              : ""
          }`,
        });
        // user with privleges to modify their own Depaertments employees only
      } else if (privileges.departmentOnly) {
        res.status(200).send({
          msg: `Departments added: ${counter.departments}.\n`,
        });
        // user with privilege to add to one specific department
      } else if (privileges.assignedDepartment) {
        res.status(200).send({
          msg: `Employees added: ${counter.employees}.\n ${
            json.length !== counter.employees
              ? `${
                  json.length - counter.employees
                } entries where skipped,\n they do not belong to the ${
                  privileges.assignedDepartmentName
                } department\n or they are identical`
              : ""
          }`,
        });
      }
    }
    // return message if something went wrong
  } catch {
    res.status(200).send({
      error: `something went wrong`,
    });
  }
};

// Deleting files after processing
const deleteFile = (fileName) => {
  console.log("seeee", fileName);
  const directory = "uploads";
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
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

// save files to mongo
const saveToMongoAndAddUser = async (json, user) => {
  const departmentArray = await departmentReturn();
  let newDepartments = [];

  //Return the different scenarios
  json = await json.map((employee) => {
    // user has employee privileges but no department privileges
    if (privileges.employeeOnly) {
      return {
        ...employee,
        Abteilung: departmentArray.includes(employee.Abteilung)
          ? employee.Abteilung
          : "",
        assignedBy: user,
      };
      //user has all privileges
    } else if (privileges.all || privileges.departmentOnly) {
      console.log("checkfacts", departmentArray, employee.Abteilung);
      if (
        !departmentArray.includes(employee.Abteilung) &&
        employee.Abteilung !== undefined
      ) {
        newDepartments = [...newDepartments, { abteilung: employee.Abteilung }];
      }

      return {
        ...employee,
        Abteilung: employee.Abteilung ? employee.Abteilung : "",
        assignedBy:
          employee.Abteilung === "" || employee.Abteilung === undefined
            ? ""
            : user,
      };
      //user has privleges to import data from own department
    } else if (privileges.assignedDepartment) {
      return privileges.assignedDepartmentName === employee.Abteilung
        ? {
            ...employee,
            Abteilung: departmentArray.includes(employee.Abteilung)
              ? employee.Abteilung
              : "",
            assignedBy: user,
          }
        : "";
    }
  });
  //Cleanup after Mapping
  (function () {
    json = json.filter((e) => {
      return e !== "" && e.abteilung !== "undefined";
    });
  })();

  // Check if entries are unqiue, comparison does not include who it is assigned by
  const checkDoubleEntries = async (json) => {
    const reqObj = { internal: true, data: "none" };
    const employeeArray = await employeeRegistry(reqObj);
    json = await json.filter((jsonE) => {
      const same = employeeArray.filter((empE) => {
        return (
          empE.Vorname === jsonE.Vorname &&
          empE.Nachname === jsonE.Nachname &&
          empE.Strasse === jsonE.Strasse &&
          empE.Nr === jsonE.Nr &&
          empE.PLZ === jsonE.PLZ &&
          empE.Ort === jsonE.Ort &&
          empE.Land === jsonE.Land &&
          empE.Abteilung === jsonE.Abteilung &&
          empE.Position === jsonE.Position
        );
      });
      return same.length === 0;
    });
    return json;
  };
  json = await checkDoubleEntries(json);

  // Save new departments if user has privlieges to save departments
  if (privileges.departmentPrivileges) {
    await Abteilung.insertMany(newDepartments)
      .then((value) => {
        console.log("Departments Saved Successfully", value.length);
        counter.departments = value.length;
      })

      .catch((error) => {
        console.log("this", error);
      });
  }

  // save employees if user has privileges to save employees
  if (privileges.employeePrivileges || privileges.assignedDepartment) {
    console.log("before inserting employees", json);
    await Employees.insertMany(json)
      .then((value) => {
        console.log("Employees Saved Successfully", value.length);
        counter.employees = value.length;
      })

      .catch((error) => {
        console.log(error);
      });
  }
  return counter;
};
