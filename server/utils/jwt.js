import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../schema/User.js";
dotenv.config();
const issueToken = (userID) => {
  const expiresIn = "30d";
  const payload = {
    sub: userID,
  };

  const jwt = jsonwebtoken.sign(payload, process.env.SECRET_JWT_KEY, {
    expiresIn,
  });
  return jwt;
};

const verifyPriviliges = async (token, res, type) => {
  if (!token) {
    console.log("no token");
    return false;
  } else {
    return jsonwebtoken.verify(
      token,
      process.env.SECRET_JWT_KEY,

      async function (err, decoded) {
        if (err) {
          return { error: "invalid signature" };
        }
        const user = await User.find({
          _id: decoded.sub,
        });
        console.log(user);
        return {
          employeePrivileges: user[0].employeePrivileges,
          departmentPrivileges: user[0].departmentPrivileges,
          assignedDepartment: user[0].assignedDepartment,
          user: user[0].email,
          none:
            !user[0].departmentPrivileges &&
            !user[0].employeePrivileges &&
            !user[0].assignedDepartment
              ? true
              : false,
          all:
            user[0].departmentPrivileges && user[0].employeePrivileges
              ? true
              : false,
          employeeOnly:
            !user[0].departmentPrivileges && user[0].employeePrivileges
              ? true
              : false,
          departmentOnly:
            !user[0].departmentPrivileges && user[0].departmentPrivileges
              ? true
              : false,
        };
      }
    );
  }
};

export { issueToken, verifyPriviliges };
