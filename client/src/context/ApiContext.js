import { createContext, useState, useEffect, useRef } from "react";

export const ApiContext = createContext();

export const ApiContextProvider = (props) => {
  console.log();
  const [userData, setUserData] = useState({
    password: "",
    email: "",
    departmentPrivileges: false,
    employeePrivileges: false,
    loginPassword: "",
    loginEmail: "",
    token: "",
    department: "",
  });
  const [departments, setDepartments] = useState([
    {
      id: 1,
      department: "Loading",
    },
  ]);

  const loggedIn = useRef("");
  const updateMongo = useRef([]);
  const updateMongoDepartment = useRef([]);
  const originalEmployeeList = useRef([]);

  const [rows, setRows] = useState([
    {
      id: 1,
      Vorname: "Loading",
      Nachname: "Loading",
      Strasse: "Loading",
      Nr: "Loading",
      PLZ: "Loading",
      Ort: "Loading",
      Land: "Loading",
      Position: "Loading",
      Abteilung: "Loading",
    },
  ]);
  useEffect(() => {
    setRows(
      rows.map((obj, ind) => {
        return { ...obj, id: ind + 1 };
      })
    );
  }, []);

  const ApiCall = async (request) => {
    let route = "";
    let querys = {};
    if (request === "login") {
      route = "/login";
      querys = {
        email: userData.email,
        password: userData.password,
      };
    }
    if (request === "validateProfile") {
      route = "/login";
      querys = {
        email: userData.email,
        password: userData.password,
      };
    }

    if (request === "signup") {
      route = "/signup";
      querys = {
        email: userData.email,
        password: userData.password,
        departmentPrivileges: userData.departmentPrivileges,
        employeePrivileges: userData.employeePrivileges,
      };
    }
    if (request === "employeeList") {
      route = "/employeeList";
      querys = {
        email: userData.email,
        password: userData.password,
      };
    }
    if (request === "employeeList/save") {
      route = "/employeeList/save";
      querys = {
        changeList: updateMongo.current,
        token: localStorage.getItem("token"),
      };
    }
    if (request === "departments") {
      route = "/departments";
      querys = {
        token: localStorage.getItem("token"),
      };
    }
    if (request === "departments/save") {
      route = "/departments/save";
      querys = {
        token: localStorage.getItem("token"),
        abteilung: userData.department,
      };
    }
    fetch(route, {
      method: "POST",
      body: JSON.stringify(querys),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (request === "employeeList/save" || request === "employeeList") {
          originalEmployeeList.current = resData;
          console.log(resData);
          setRows(
            resData.employees.map((obj, ind) => {
              console.log(obj);
              return { ...obj, id: ind + 1 };
            })
          );
          updateMongo.current = [];
        }

        if (request === "login") {
          console.log(resData.user);
          if (resData.token) {
            localStorage.setItem("token", resData.token);
            localStorage.setItem(
              "departmentPrivilegessettings",
              resData.user.departmentPrivileges
            );
            localStorage.setItem(
              "employeePrivilegessettings",
              resData.user.employeePrivileges
            );
            loggedIn.current = true;
            window.location.reload(false);
            setUserData({
              password: "",
              email: resData.user.email,
              departmentPrivileges: resData.user.departmentPrivileges,
              employeePrivileges: resData.user.employeePrivileges,
              loginPassword: "",
              loginEmail: resData.user.email,
            });
          }
        }
        if (request === "departments" || request === "departments/save") {
          console.log(resData.Abteilung);
          setDepartments(
            resData.Abteilung.map((obj, ind) => {
              console.log(obj);
              return { ...obj, id: ind + 1 };
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ApiContext.Provider
      value={{
        ApiCall,
        userData,
        setUserData,
        rows,
        setRows,
        updateMongo,
        originalEmployeeList,
        loggedIn,
        departments,
        setDepartments,
        updateMongoDepartment,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};
