import { MongoRegistrySave } from "../utils/MongoRegistrySave.js";
import Employees from "../schema/Employees.js";

export const employeeRegistrySave = async (req, res) => {
  MongoRegistrySave(req, res, Employees, "departments");

  //Delete from MongoDB
};
