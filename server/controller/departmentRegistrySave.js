import Abteilung from "../schema/Departments.js";
import User from "../schema/User.js";
import jwt from "jsonwebtoken";
import { verifyPriviliges } from "../utils/jwt.js";

export const departmentsSave = async (req, res) => {
  let privileges = await verifyPriviliges(req.body.token, res, "departments");

  if (privileges.departmentPrivileges) {
    await (async function () {
      const markForDelete = await req.body.changeList.map((row) => {
        return row.delete ? row._id : null;
      });
      await Abteilung.deleteMany({ _id: markForDelete });
      //Update for MongoDB
      for (const row of req.body.changeList) {
        if (!row.delete && row._id.substring(0, 4) !== "TEMP") {
          const check = await Abteilung.updateOne(
            { _id: row._id },
            {
              abteilung: row.abteilung,
            }
          );
        }
      }
      //create new mongoDB
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
        msg: "All departments",
        abteilung: abteilung,
      });
    })();
  } else {
    res.status(403).json({ msg: "permission denied" });
  }
};
