import { TextField } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function CreateUser() {
  const { ApiCall, userData, setUserData } = useContext(ApiContext);

  const textInputHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    console.log(userData);
  };
  const checkBoxHandler = (e) => {
    console.log(e.target.checked);
    setUserData({ ...userData, [e.target.id]: e.target.checked });
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
      Request department modification privlieges
      <Checkbox id="departmentPrivileges" onChange={checkBoxHandler} />
      Request employee modification privileges{" "}
      <Checkbox id="employeePrivileges" onChange={checkBoxHandler} />
      <button onClick={() => ApiCall("signup")}>Texting</button>
    </div>
  );
}
