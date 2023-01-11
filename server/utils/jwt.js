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

const verifyPriviliges = async (token, res, type, myFunction) => {
  jsonwebtoken.verify(
    token,
    process.env.SECRET_JWT_KEY,

    async function (err, decoded) {
      if (err) {
        return { error: "invalid signature" };
      }
      const user = await User.findOne({
        _id: decoded.sub,
      });
      if (type === "employees") {
        if (!user.employeePrivileges) {
          res.status(401).json({
            msg: "not authorized",
          });
        } else if (type === "departments") {
          myFunction;
        }
      } else {
        if (!user.departmentPrivileges) {
          res.status(401).json({
            msg: "not authorized",
          });
        } else {
          myFunction;
        }
      }
    }
  );
};

export { issueToken, verifyPriviliges };
