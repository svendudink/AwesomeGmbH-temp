import Abteilung from "../schema/Departments.js";
import User from "../schema/User.js";
import jwt from "jsonwebtoken";
import { verifyPriviliges } from "../utils/jwt.js";
import Employees from "../schema/Employees.js";

export const departmentsSave = async (req, res) => {
  //Check for privileges
  let privileges = await verifyPriviliges(req.body.token, res, "departments");
  if (privileges.departmentPrivileges) {
    await (async function () {
      // delete from MongoDB
      const markForDelete = await req.body.changeList.map((row) => {
        return row.delete ? row._id : null;
      });
      await Abteilung.deleteMany({ _id: markForDelete });
      //Update for MongoDB
      for (const row of req.body.changeList) {
        let originalname;
        if (!row.delete && row._id.substring(0, 4) !== "TEMP") {
          originalname = await Abteilung.find({ _id: row._id });
          console.log("checkstructure", originalname[0].abteilung);
          const check = await Abteilung.updateOne(
            { _id: row._id },
            {
              abteilung: row.abteilung,
            }
          );
        }

        await Employees.updateMany(
          {
            Abteilung: originalname[0].abteilung,
          },
          {
            Abteilung: row.abteilung,
          }
        );
        await User.updateMany(
          {
            assignedDepartment: originalname[0].abteilung,
          },
          {
            assignedDepartment: row.abteilung,
          }
        );
      }
      //create new mongoDB
      console.log(req.body.changeList);
      for (const row of req.body.changeList) {
        if (row._id.substring(0, 4) === "TEMP") {
          const department = new Abteilung({
            abteilung: row.abteilung,
          });
          await department.save();
        }
      }
      const abteilung = await Abteilung.find();
      res.status(200).json({
        msg: "Changes are saved",
        abteilung: abteilung,
      });
    })();
  } else {
    res.status(403).json({ msg: "permission denied" });
  }
};
