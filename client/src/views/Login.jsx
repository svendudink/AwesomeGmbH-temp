/////////////////////////////////////////Sven's//Coding////////////////////////////////
// login screen
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import { TextField } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { useContext, useEffect } from "react";
import { getToken } from "../Helpers/getToken";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { websiteColor } from "../config/config";

export default function Login() {
  const { ApiCall, userData, setUserData, loggedIn } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      loggedIn.current = true;
      navigate("/EmployeeList");
    } else {
    }
  });

  const InputHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      ApiCall("login");
    }
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
        marginTop: "50px",
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
          onChange={InputHandler}
          sx={{ color: `${websiteColor}` }}
        />
        <br />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={InputHandler}
          onKeyDown={handleKeyDown}
        />
        <br />
        <br />
        <Button onClick={() => ApiCall("login")}>
          <div style={{ color: `${websiteColor}` }}>Login</div>
        </Button>
      </div>
    </div>
  );
}
