import { TextField } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { useContext, useEffect } from "react";
import { getToken } from "../Helpers/getToken";

export default function Login() {
  const { ApiCall, userData, setUserData, loggedIn } = useContext(ApiContext);

  useEffect(() => {
    const token = getToken();
    if (token) {
      console.log("logged in");
      loggedIn.current = true;
    } else {
      console.log("not logged");
    }
  });

  const InputHandler = (e) => {
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
        onChange={InputHandler}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={InputHandler}
      />
      <button onClick={() => ApiCall("login")}>Login</button>
    </div>
  );
}
