import Employees from "../schema/Employees.js";

/////////////////////////////////////////Sven's//Coding////////////////////////////////
// sends back all querys from MongoDB as repsonse, or if req.internal is set, repsonse is
// an oject
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

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
