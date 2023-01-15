/////////////////////////////////////////Sven's//Coding////////////////////////////////
// App bar
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// imports
import { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { getToken } from "../Helpers/getToken";
import { visitForAll } from "../config/config";
import { websiteColor2 } from "../config/config";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { loggedIn, ApiCall, appBarLoggedIn, setAppBarLoggedIn } =
    useContext(ApiContext);

  // load employeelist
  useEffect(() => {
    ApiCall("employeeList");
    const token = getToken();
    if (token) {
      loggedIn.current = true;
      setAppBarLoggedIn(true);
    } else {
      setAppBarLoggedIn(false);
    }
  }, [loggedIn]);

  // logout and remove tokens
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("departmentPrivilegessettings");
    localStorage.removeItem("employeePrivilegessettings");
    localStorage.removeItem("assignedDepartment");
    alert("You are logged out");
    loggedIn.current = false;
    setAppBarLoggedIn(false);
    window.location.reload(false);
  };

  const login = () => {
    navigate("/Login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: `${websiteColor2}` }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Awesome Company GmbH: Employee Registry.
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
          {(loggedIn.current || visitForAll) && (
            <Button onClick={() => navigate("/EmployeeList")} color="inherit">
              Employee list
            </Button>
          )}
          {(loggedIn.current || visitForAll) && (
            <Button onClick={() => navigate("/Departments")} color="inherit">
              Departments
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
