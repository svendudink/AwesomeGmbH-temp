/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Activate or delete Account based on Supervisor email response
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

//import
import { decodeToken } from "../utils/jwt.js";
import User from "../schema/User.js";
import { mailSender } from "./verificationMail.js";

export const verification = async (req, res) => {
  console.log(req.body.token);
  const message = await decodeToken(req.body.token);
  const approved = message.split(",", 1)[0] === "approve" ? true : false;
  const user = message.substring(message.indexOf(",") + 1);
  console.log(approved);
  // Activate account
  if (approved) {
    const check = await User.updateOne(
      { email: user },
      {
        disabled: false,
      }
    );
    console.log(check);
    res.status(200).json({
      verification: true,
    });
    mailSender(user, "approved");
  } else {
    // Delete account
    User.deleteOne({ email: user }, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });

    res.status(200).json({
      verification: true,
    });
    mailSender(user, "declined");
  }
};
