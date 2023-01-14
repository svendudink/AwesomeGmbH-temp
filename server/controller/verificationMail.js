import { transporter } from "../index.js";
import { issueToken } from "../utils/jwt.js";

const mailSender = async (req, action) => {
  issueToken();

  let subject = "";
  let text = "";
  let email = "";

  if (action === "signup") {
    console.log("nextval");
    subject = "Welcome to Awesome GMBH";
    (text = `Welcome to Awesome GMBH employee registry, your account will be activated in the next 24 hours`),
      (email = req.body.email);
  }

  if (action === "approved") {
    console.log("nextval");
    subject = "Welcome to Awesome GMBH";
    (text = `Your account is approved, you can now login with your login data`),
      (email = req);
  }
  if (action === "declined") {
    console.log("nextval");
    subject = "Awesome GMBH Account declined";
    (text = `Your account is declined`), (email = req);
  }

  if (action === "admin") {
    console.log("nextval");
    subject = `a new employee registered `;
    text = `a new employee registered with email adress: ${req.body.email},${
      req.body.assignedDepartment
        ? ` assigned to ${req.body.assignedDepartment}`
        : ""
    }, ${
      req.body.departmentPrivileges || req.body.employeePrivileges
        ? `requested an account with the following privileges: ${
            req.body.departmentPrivileges
              ? "[add delete and Change departments]"
              : ""
          }${
            req.body.employeePrivileges
              ? " [add delete and Change Employee entries]"
              : ""
          }`
        : ""
    } to approve click here: ${`http://localhost:3000/verification/${issueToken(
      `approve,${req.body.email}`
    )}`} else click here: ${`http://localhost:3000/verification/${issueToken(
      `decline,${req.body.email}`
    )}`}`;
    email = req.body.email;
  }

  const mail = {
    from: process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("mailfailed", err);
    } else {
      console.log("done");
      console.log(data);
      return;
    }
  });
};

export { mailSender };
