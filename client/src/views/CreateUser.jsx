/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Create a new user
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// imports
import { TextField } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { useContext, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { websiteColor } from "../config/config";

export default function CreateUser() {
  const [departmentMod, setDepartmentMod] = useState(false);
  const { ApiCall, userData, setUserData, departments } =
    useContext(ApiContext);
  useEffect(() => {
    ApiCall("departments");
  }, []);

  // Data input handlers
  const textInputHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const checkBoxHandler = (e) => {
    if (e.target.id === "depMod") {
      if (departmentMod) {
        setDepartmentMod(false);
      } else {
        setDepartmentMod(true);
      }
    }
    if (
      e.target.id === "departmentPrivileges" ||
      e.target.id === "employeePrivileges"
    ) {
      setUserData({ ...userData, [e.target.id]: e.target.checked });
    } else {
    }
  };

  const registerHandler = () => {
    if (userData.password === userData.confirmPassword) {
      ApiCall("signup");
    } else if (userData.password.length < 4) {
      alert("Password is to short");
    } else {
      alert("Passwords do not match");
    }
  };

  //JSX Code

  return (
    <div
      style={{
        position: "obsolute",
        textAlign: "center",
        height: "650px",
        width: "300px",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        // top: "50%",
        // left: "50%",
        marginTop: "50px",
        // marginLeft: "-100px",
        // height: "600px",
        // width: "200px",
        paddingTop: "10px",
        border: `solid 3px ${websiteColor}`,
        borderRadius: "10px",
      }}
    >
      <div style={{ paddingTop: "20px" }}>
        {" "}
        <TextField
          id="email"
          label="Company Email adress"
          type="Email"
          variant="filled"
          onChange={textInputHandler}
        />
        <br />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={textInputHandler}
        />
        <br />
        <br />
        <TextField
          id="confirmPassword"
          label=" Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          onChange={textInputHandler}
        />{" "}
        <br />
        <br />
        <br />
        Assign to department
        <select
          style={{ width: "100px" }}
          id="assignedDepartment"
          name="Abteilung"
          onChange={(e) => handleInputChange(e)}
        >
          <option key={`Number0`} value={""}>
            {"(View only)"}
          </option>
          ;
          {departments.map((option, i) => {
            return (
              <option key={`number${i}`} value={option.abteilung}>
                {option.abteilung}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <br />
        Request privileges <br />
        to edit delete and
        <br /> modify departments
        <Checkbox id="departmentPrivileges" onChange={checkBoxHandler} />
        <br />
        <br />
        <br />
        Request privileges to
        <br />
        edit delete and modify all employee entries{" "}
        <Checkbox id="employeePrivileges" onChange={checkBoxHandler} />
        <br />
        <br />
        <Button onClick={registerHandler}>
          <div style={{ color: `${websiteColor}` }}>Register</div>
        </Button>
      </div>
    </div>
  );
}
