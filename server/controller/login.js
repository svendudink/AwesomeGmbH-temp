import User from "../schema/User.js";
import { verifyPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
  try {
    console.log("body", req.body.email, req.body.password);
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log(user);
    if (!user) {
      console.log("line");
      res.status(401).json({ msg: "user not found" });
    } else {
      try {
        const verified = await verifyPassword(req.body.password, user.password);
        console.log("verified", verified);
        if (!verified) {
          res.status(401).json({ msg: "wrong password" });
        } else {
          console.log("user singin", user);
          const token = issueToken(user._id);
          console.log("user singin2", user);
          res.status(200).json({
            msg: "login worked",
            user: {
              email: user.email,
              id: user._id,
            },
            token,
          });
        }
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "broken stuff",
    });
  }
};
