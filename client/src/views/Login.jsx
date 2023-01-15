import { TextField } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { useContext, useEffect } from "react";
import { getToken } from "../Helpers/getToken";
import { Button } from "@material-ui/core";

export default function Login() {
  const { ApiCall, userData, setUserData, loggedIn } = useContext(ApiContext);

  useEffect(() => {
    const token = getToken();
    if (token) {
      loggedIn.current = true;
    } else {
    }
  });

  const InputHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  return (
    <div
      style={{
        position: "obsolute",
        textAlign: "center",
        height: "250px",
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
        border: "solid 3px #1976D2",
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
          onChange={InputHandler}
        />
        <br />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={InputHandler}
        />
        <br />
        <br />
        <Button onClick={() => ApiCall("login")}>Login</Button>
      </div>
    </div>
  );
}
