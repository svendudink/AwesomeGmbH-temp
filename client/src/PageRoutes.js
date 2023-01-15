import Login from "./views/Login.jsx";
import EmployeeList from "./views/EmployeeList.jsx";
import CreateUser from "./views/CreateUser.jsx";
import Departments from "./views/Departments.jsx";
import Verification from "./views/Verification.jsx";
import { Route, Routes } from "react-router-dom";
import { ApiContext } from "./context/ApiContext.js";
import { useContext } from "react";
import { visitForAll } from "./config/config.js";

function PageRoutes() {
  const { loggedIn } = useContext(ApiContext);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route
        path="/EmployeeList"
        element={loggedIn.current || visitForAll ? <EmployeeList /> : <Login />}
      />
      <Route path="/CreateUser" element={<CreateUser />} />
      <Route
        path="/Departments"
        element={loggedIn.current || visitForAll ? <Departments /> : <Login />}
      />
      <Route path="*" element={<Login />} />
      <Route path="/verification/:token/" element={<Verification />} />
    </Routes>
  );
}

export default PageRoutes;
