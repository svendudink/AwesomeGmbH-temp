/////////////////////////////////////////Sven's//Coding////////////////////////////////
//issue the token and verify different privlege scenarios
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// Imports
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../schema/User.js";
dotenv.config();

// issue a token
const issueToken = (message) => {
  const expiresIn = "30d";
  const payload = {
    sub: message,
  };

  const jwt = jsonwebtoken.sign(payload, process.env.SECRET_JWT_KEY, {
    expiresIn,
  });
  return jwt;
};

// decode token message
const decodeToken = async (token) => {
  let secret = "";
  jsonwebtoken.verify(
    token,
    process.env.SECRET_JWT_KEY,
    async function (err, decoded) {
      if (err) {
        return { error: "invalid signature" };
      }
      secret = decoded.sub;
    }
  );
  return secret;
};

// verify privlieges and return an object with combinations of privileges
const verifyPriviliges = async (token) => {
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
        console.log(
          "validateUser",
          user,
          "checkifValid",
          user[0].assignedDepartment === true
        );
        return {
          employeePrivileges: user[0].employeePrivileges,
          departmentPrivileges: user[0].departmentPrivileges,
          assignedDepartment: user[0].assignedDepartment === "" ? false : true,
          user: user[0].email,
          assignedDepartmentName: user[0].assignedDepartment,
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

export { issueToken, verifyPriviliges, decodeToken };
