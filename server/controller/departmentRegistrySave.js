import Departments from "../schema/Departments.js";
import User from "../schema/User.js";
import jwt from "jsonwebtoken";

export const departmentsSave = async (req, res) => {
  MongoRegistrySave(req, res, Departments, "departments");
};
