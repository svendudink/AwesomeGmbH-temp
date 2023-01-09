import Departments from "../schema/Departments.js";
import User from "../schema/User.js";
import jwt from "jsonwebtoken";

export const departmentsSave = async (req, res) => {
  console.log("test", req.body);

  jwt.verify(
    req.body.token,

    process.env.SECRET_JWT_KEY,
    async function (err, decoded) {
      if (err) {
        return { error: "invalid signature" };
      }
      const user = await User.findOne({
        _id: decoded.sub,
      });
      if (!user.departmentPrivileges) {
        res.status(401).json({
          msg: "not authorized",
        });
      } else {
        const existingDepartment = await Departments.findOne({
          Abteilung: req.body.department,
        });
        if (existingDepartment) {
          return res.status(409).json({ msg: "Department exists allready" });
        }

        const department = new Departments({
          Abteilung: req.body.department,
        });

        const createdDepartment = await department.save();

        const departments = await Departments.find();
        res.status(200).json({
          msg: "All Departments",
          Abteilung: departments,
        });
      }
    }
  );
};
