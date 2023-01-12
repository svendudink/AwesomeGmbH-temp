import { TextField } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useRef } from "react";

export default function CreateUser() {
  const { ApiCall, userData, setUserData, departments } =
    useContext(ApiContext);

  const [departmentMod, setDepartmentMod] = useState(false);

  const textInputHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    console.log(userData);
  };
  const checkBoxHandler = (e) => {
    console.log(e.target.checked);
    setUserData({ ...userData, [e.target.id]: e.target.checked });
  };
  const handleInputChange = (e) => {
    //setUserData({ ...userData, [e.target.id]: e.target.value });
  };
  const handleCheckBox = () => {
    departmentMod ? setDepartmentMod(false) : setDepartmentMod(true);
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
      />
      request department modification privileges
      <Checkbox id="depMod" onChange={handleCheckBox} />
      {departmentMod && (
        <select
          style={{ width: "100px" }}
          name="Abteilung"
          value={"Abteilung"}
          onChange={(e) => handleInputChange(e)}
        >
          {departments.map((option, i) => {
            return <option value={option.abteilung}>{option.abteilung}</option>;
          })}
        </select>
      )}
      Request all department modification privleges
      <Checkbox id="departmentPrivileges" onChange={checkBoxHandler} />
      Request employee modification privileges{" "}
      <Checkbox id="employeePrivileges" onChange={checkBoxHandler} />
      <button onClick={() => ApiCall("signup")}>Register</button>
    </div>
  );
}
