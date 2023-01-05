import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { ListItem } from "@mui/material";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Awesome Company GmbH: Employee Registry
          </Typography>
          <Button onClick={() => navigate("/Login")} color="inherit">
            Login
          </Button>

          <Button onClick={() => navigate("/CreateUser")} color="inherit">
            Create Account
          </Button>
          <Button onClick={() => navigate("/EmployeeList")} color="inherit">
            View employee list
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
