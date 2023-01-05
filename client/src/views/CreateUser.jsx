import { TextField } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";

export default function CreateUser() {
  const { ApiCall, userData, setUserData } = useContext(ApiContext);

  const textInputHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    console.log(userData);
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
      <button onClick={() => ApiCall("signup")}>Texting</button>
    </div>
  );
}
