import { useEffect } from "react";
import Login from "./views/Login.jsx";
import EmployeeList from "./views/EmployeeList.jsx";
import CreateUser from "./views/CreateUser.jsx";
import ButtonAppBar from "./components/ButtonAppBar.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext.js";

// Justwork please
function App() {
  return (
    <BrowserRouter>
      <div>
        <ButtonAppBar />
        <Routes>
          <Route
            path="/Login"
            element={
              <ApiContextProvider>
                <Login />
              </ApiContextProvider>
            }
          />
          <Route
            path="/EmployeeList"
            element={
              <ApiContextProvider>
                <EmployeeList />
              </ApiContextProvider>
            }
          />
          <Route
            path="/CreateUser"
            element={
              <ApiContextProvider>
                <CreateUser />
              </ApiContextProvider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
