import * as dotenv from "dotenv";
import mongoose from "mongoose";
import validator from "validator";
import User from "../schema/User.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    console.log("incoming", req.body);
    if (!validator.isEmail(req.body.email)) {
      res.json({ error: "Email adress is invalid" });
      return;
    }

    if (
      validator.isEmpty(req.body.password) ||
      !validator.isLength(req.body.password, { min: 4 })
    ) {
      res.json({ error: "Password is to short, use minimum 4 characters" });
      return;
    }

    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.json({
        error: "User exists allready",
      });
    }
    const hashedPw = await bcrypt.hash(req.body.password, 12);
    console.log(hashedPw, req.body.email);
    const user = new User({
      email: req.body.email,
      password: hashedPw,
      departmentPrivileges: req.body.departmentPrivileges,
      employeePrivileges: req.body.employeePrivileges,
      assignedDepartment: req.body.assignedDepartment,
    });
    const createdUser = await user.save();
    console.log("whatis", createdUser);
  } catch {
    console.log("unknown error");
  }
};
