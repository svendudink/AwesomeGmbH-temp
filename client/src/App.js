import Login from "./views/Login.jsx";
import EmployeeList from "./views/EmployeeList.jsx";
import CreateUser from "./views/CreateUser.jsx";
import Departments from "./views/Departments.jsx";
import ButtonAppBar from "./components/ButtonAppBar.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext.js";
import PageRoutes from "./PageRoutes.js";

function App() {
  return (
    <BrowserRouter>
      <ApiContextProvider>
        <div>
          <ButtonAppBar />

          <PageRoutes />
        </div>
      </ApiContextProvider>
    </BrowserRouter>
  );
}

export default App;
