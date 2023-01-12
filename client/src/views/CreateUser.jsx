import { TextField } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { useContext, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function CreateUser() {
  const { ApiCall, userData, setUserData, departments } =
    useContext(ApiContext);
  useEffect(() => {
    ApiCall("departments");
  }, []);

  const [departmentMod, setDepartmentMod] = useState(false);

  const textInputHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    console.log(userData);
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    console.log(userData);
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
      console.log(userData);
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {" "}
      <TextField
        id="email"
        label="Company Email adress"
        type="Email"
        variant="filled"
        onChange={textInputHandler}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={textInputHandler}
      />
      <TextField
        id="password"
        label=" Confirm Password"
        type="password"
        autoComplete="current-password"
        variant="filled"
        onChange={textInputHandler}
      />{" "}
      Assign to department
      <select
        style={{ width: "100px" }}
        id="AssignedDepartment"
        name="Abteilung"
        value={"Abteilung"}
        onChange={(e) => handleInputChange(e)}
      >
        <option value={"none"}>{"none (View only)"}</option>;
        {departments.map((option, i) => {
          return <option value={option.abteilung}>{option.abteilung}</option>;
        })}
      </select>
      Request all department modification privleges
      <Checkbox id="departmentPrivileges" onChange={checkBoxHandler} />
      Request employee modification privileges{" "}
      <Checkbox id="employeePrivileges" onChange={checkBoxHandler} />
      <button onClick={() => ApiCall("signup")}>Register</button>
    </div>
  );
}
