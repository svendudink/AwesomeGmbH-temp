import { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { ListItem } from "@mui/material";
import { ApiContext } from "../context/ApiContext";
import { getToken } from "../Helpers/getToken";
import { useState } from "react";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { loggedIn, updateMongo } = useContext(ApiContext);
  const [appBarLoggedIn, setAppBarLoggedIn] = useState();

  useEffect(() => {
    const token = getToken();
    if (token) {
      loggedIn.current = true;
      setAppBarLoggedIn(true);
    } else {
      setAppBarLoggedIn(false);
    }
  }, [loggedIn]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("departmentPrivilegessettings");
    localStorage.removeItem("employeePrivilegessettings");

    loggedIn.current = false;
    setAppBarLoggedIn(false);
    window.location.reload(false);
  };

  const login = () => {
    navigate("/Login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Awesome Company GmbH: Employee Registry
          </Typography>
          {!appBarLoggedIn ? (
            <Button onClick={login} color="inherit">
              Login
            </Button>
          ) : (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          )}
          <Button onClick={() => navigate("/CreateUser")} color="inherit">
            Create Account
          </Button>
          <Button onClick={() => navigate("/EmployeeList")} color="inherit">
            Employee list
          </Button>
          <Button onClick={() => navigate("/Departments")} color="inherit">
            Departments
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
