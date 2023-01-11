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
        return {
          employeePrivileges: user[0].employeePrivileges,
          departmentPrivileges: user[0].departmentPrivileges,
          user: user[0].email,
        };
      }
    );
  }
};

export { issueToken, verifyPriviliges };
