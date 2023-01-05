import * as dotenv from "dotenv";
import mongoose from "mongoose";
import validator from "validator";
import User from "../../schema/User.mjs";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    if (!validator.isEmail(req.body.email)) {
      res.status(555).json({ msg: "Email adress invalid" });
      return;
    }

    if (
      validator.isEmpty(req.body.password) ||
      !validator.isLength(req.body.password, { min: 4 })
    ) {
      res.status(405).json({ msg: "Email adress invalid" });
      return;
    }

    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(409).json({ msg: "User exist allready" });
    }
    const hashedPw = await bcrypt.hash(req.body.password, 12);
    console.log(hashedPw, req.body.email);
    const user = new User({
      email: req.body.email,
      password: hashedPw,
    });
    console.log(user);
    const createdUser = await user.save();
    console.log("whatis", createdUser);
  } catch {
    console.log("unknown error");
  }
};
