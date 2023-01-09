import Departments from "../schema/Departments.js";

export const departmentsSave = async (req, res) => {
  console.log("test", req.body);

  const existingDepartment = await Departments.findOne({
    department: req.body.department,
  });
  if (existingDepartment) {
    return res.status(409).json({ msg: "Department exists allready" });
  }
};
