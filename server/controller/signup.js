/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Sign up form
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import validator from "validator";
import User from "../schema/User.js";
import bcrypt from "bcrypt";
import { mailSender } from "./verificationMail.js";
import { passwordLength } from "../config/config.js";

export const signUp = async (req, res) => {
  try {
    console.log("incoming", req.body);
    if (!validator.isEmail(req.body.email)) {
      res.json({ error: "Email adress is invalid" });
      return;
    }

    if (
      validator.isEmpty(req.body.password) ||
      !validator.isLength(req.body.password, { min: passwordLength })
    ) {
      res.json({
        error: `Password is to short, use minimum ${passwordLength} characters`,
      });
      return;
    }
    // check if user allready exists
    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.json({
        error: "User exists allready",
      });
    }

    // Create new user
    const hashedPw = await bcrypt.hash(req.body.password, 12);
    console.log(hashedPw, req.body.email);
    const user = new User({
      email: req.body.email,
      password: hashedPw,
      departmentPrivileges: req.body.departmentPrivileges,
      employeePrivileges: req.body.employeePrivileges,
      assignedDepartment: req.body.assignedDepartment,
      disabled: true,
    });
    const createdUser = await user.save();
    mailSender(req, "signup");
    mailSender(req, "admin");
    console.log("whatis", createdUser);
    res.status(200).json({
      msg: "your account has been created, \nYour account still needs to be approved by a Supervisor \n\n\n((For demonstration purposes \nyou will also receive the supervisor email to approve your account))",
    });
  } catch {
    console.log("unknown error");
  }
};
