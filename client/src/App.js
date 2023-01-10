import { useEffect } from "react";
import Login from "./views/Login.jsx";
import EmployeeList from "./views/EmployeeList.jsx";
import CreateUser from "./views/CreateUser.jsx";
import Departments from "./views/Departments.jsx";
import ButtonAppBar from "./components/ButtonAppBar.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext.js";




function App() {
  return (
    <BrowserRouter>
      <ApiContextProvider>
        <div>
          <ButtonAppBar />

          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/EmployeeList" element={<EmployeeList />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/Departments" element={<Departments />} />
          </Routes>
        </div>
      </ApiContextProvider>
    </BrowserRouter>
  );
}

export default App;
