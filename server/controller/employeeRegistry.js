import Employees from "../schema/Employees.js";

export const employeeRegistry = async (req, res) => {
  console.log("test", req.body);

  const employees = await Employees.find();
  res.status(200).json({
    employees: employees,
  });
};
