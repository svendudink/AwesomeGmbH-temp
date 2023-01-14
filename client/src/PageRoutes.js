import Login from "./views/Login.jsx";
import EmployeeList from "./views/EmployeeList.jsx";
import CreateUser from "./views/CreateUser.jsx";
import Departments from "./views/Departments.jsx";
import Verification from "./views/Verification.jsx";
import { Route, Routes } from "react-router-dom";
import { ApiContext } from "./context/ApiContext.js";
import { useContext } from "react";

function PageRoutes() {
  const { loggedIn } = useContext(ApiContext);
  console.log(loggedIn.current);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route
        path="/EmployeeList"
        element={loggedIn.current ? <EmployeeList /> : <Login />}
      />
      <Route path="/CreateUser" element={<CreateUser />} />
      <Route
        path="/Departments"
        element={loggedIn.current ? <Departments /> : <Login />}
      />
      <Route path="*" element={<Login />} />
      <Route path="/verification/:token/" element={<Verification />} />
    </Routes>
  );
}

export default PageRoutes;
