import Employees from "../schema/Employees.js";

export const employeeRegistry = async (req, res) => {
  const employees = await Employees.find();

  if (req.internal) {
    return employees;
  } else {
    res.status(200).json({
      employees: employees,
    });
  }
};
