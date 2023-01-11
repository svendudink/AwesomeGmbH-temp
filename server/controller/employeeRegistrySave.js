import Employees from "../schema/Employees.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import { verifyPriviliges } from "../utils/jwt.js";

export const employeeRegistrySave = async (req, res) => {
  let privileges = await verifyPriviliges(req.body.token, res, "departments");

  if (privileges.departmentPrivileges) {
    (async function () {
      const markForDelete = await req.body.changeList.map((row) => {
        return row.delete ? row._id : null;
      });

      await Employees.deleteMany({ _id: markForDelete });
      //Update for MongoDB
      for (const row of req.body.changeList) {
        if (!row.delete && row._id.substring(0, 4) !== "TEMP") {
          console.log(row.Vorname);
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
            }
          );
          console.log("check", check);
        }
      }

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
