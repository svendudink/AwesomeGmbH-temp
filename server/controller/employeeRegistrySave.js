import Employees from "../schema/Employees.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import { verifyPriviliges } from "../utils/jwt.js";

export const employeeRegistrySave = async (req, res) => {
  let privileges = await verifyPriviliges(req.body.token, res, "departments");
  console.log(privileges);

  console.log("tstst", req.body.changeList);

  if (privileges.departmentPrivileges || privileges.assignedDepartment) {
    (function () {
      req.body.changeList = req.body.changeList.filter((row) => {
        return privileges.assignedDepartment === row.Abteilung;
      });
    })();
    await (async function () {
      const markForDelete = await req.body.changeList.map((row) => {
        return row.delete ? row._id : null;
      });

      await (async function () {
        try {
          await Employees.deleteMany({ _id: markForDelete });

          for (const row of req.body.changeList) {
            if (!row.delete && row._id.substring(0, 4) !== "TEMP") {
              console.log(privileges.user);
              const check = await Employees.updateOne(
                { _id: row._id },
                {
                  Vorname: row.Vorname,
                  Nachname: row.Nachname,
                  Strasse: row.Strasse,
                  Nr: row.Nr,
                  PLZ: row.PLZ,
                  Ort: row.Ort,
                  Land: row.Land,
                  Position: row.Position,
                  Abteilung: row.Abteilung,
                  assignedBy: row.Abteilung ? privileges.user : "",
                }
              );
            }
          }
        } catch {
          console.log(check);
        }
      })();

      //create new mongoDB
      for (const row of req.body.changeList) {
        console.log("row from employeereg", row);

        if (row._id.substring(0, 4) === "TEMP") {
          const employee = new Employees({
            Vorname: row.Vorname,
            Nachname: row.Nachname,
            Strasse: row.Strasse,
            Nr: row.Nr,
            PLZ: row.PLZ,
            Ort: row.Ort,
            Land: row.Land,
            Position: row.Position,
            Abteilung: row.Abteilung,
            assignedBy: row.Abteilung ? privileges.user : "",
          });
          await employee.save();
        }
      }
      const employees = await Employees.find();
      res.status(200).json({
        msg: "All employees",
        employees: employees,
      });
    })();
  }
};
