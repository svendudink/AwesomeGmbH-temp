import User from "../schema/User.js";
import { verifyPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";

/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Login
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.json({ error: "User not found" });
    } else {
      try {
        const verified = await verifyPassword(req.body.password, user.password);

        if (!verified) {
          res.json({ error: "Wrong password" });
        } else {
          const token = issueToken(user._id);
          res.status(200).json({
            msg: "you are logged in",
            user: {
              email: user.email,
              id: user._id,
              departmentPrivileges: user.departmentPrivileges,
              employeePrivileges: user.employeePrivileges,
              assignedDepartment: user.assignedDepartment,
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
      msg: "something went wrong",
    });
  }
};
