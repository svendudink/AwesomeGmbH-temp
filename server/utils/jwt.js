import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
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

export { issueToken };
