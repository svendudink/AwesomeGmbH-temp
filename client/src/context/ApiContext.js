import { createContext, useState, useEffect, useRef } from "react";

export const ApiContext = createContext();

export const ApiContextProvider = (props) => {
  console.log();
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    departmentPrivileges: false,
    employeePrivileges: false,
    loginPassword: "",
    loginEmail: "",
    token: "",
    assignedDepartment: "",
  });
  const [departments, setDepartments] = useState([
    {
      id: 1,
      _id: "TEMP8",
      abteilung: "",
    },
  ]);

  const loggedIn = useRef("");
  const updateMongo = useRef([]);
  const updateMongoDepartment = useRef([]);
  const originalEmployeeList = useRef([]);

  const [rows, setRows] = useState([
    {
      _id: `TEMPID${Math.random()}`,
      Vorname: "",
      Nachname: "",
      Strasse: "",
      Nr: "",
      PLZ: "",
      Ort: "",
      Land: "",
      Position: "",
      Abteilung: "",
      assignedBy: "",
    },
  ]);
  const Employeesempty = [
    {
      _id: `TEMPID${rows.length + 1}`,
      Vorname: "",
      Nachname: "",
      Strasse: "",
      Nr: "",
      PLZ: "",
      Ort: "",
      Land: "",
      Position: "",
      Abteilung: "",
      assignedBy: "",
    },
  ];

  const Departmentsempty = [
    {
      _id: `TEMPID${rows.length + 1}`,
      abteilung: "",
    },
  ];

  const ApiCall = async (request) => {
    let route = "";
    let querys = {};
    if (request === "login") {
      route = "http://localhost:8080/login";
      querys = {
        email: userData.email,
        password: userData.password,
      };
    }
    if (request === "validateProfile") {
      route = "http://localhost:8080/login";
      querys = {
        email: userData.email,
        password: userData.password,
      };
    }

    if (request === "signup") {
      route = "http://localhost:8080/signup";
      querys = {
        email: userData.email,
        password: userData.password,
        departmentPrivileges: userData.departmentPrivileges,
        employeePrivileges: userData.employeePrivileges,
        assignedDepartment: userData.assignedDepartment,
      };
    }
    if (request === "employeeList") {
      route = "http://localhost:8080/employeeList";
      querys = {
        email: userData.email,
        password: userData.password,
      };
    }
    if (request === "employeeList/save") {
      console.log(updateMongo.current);
      route = "http://localhost:8080/employeeList/save";
      querys = {
        changeList: updateMongo.current,
        token: localStorage.getItem("token"),
      };
    }
    if (request === "departments") {
      route = "http://localhost:8080/departments";
      querys = {
        token: localStorage.getItem("token"),
      };
    }
    if (request === "departments/save") {
      console.log(updateMongoDepartment.current);
      route = "http://localhost:8080/departments/save";
      querys = {
        changeList: updateMongoDepartment.current,
        token: localStorage.getItem("token"),
      };
    }
    fetch(route, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(querys),

      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          errorhandler(resData.error);
        } else {
          if (resData.msg) {
            alert(resData.msg);
          }

          if (request === "employeeList/save" || request === "employeeList") {
            console.log("readched");
            if (resData.employees.length === 0) {
              setRows(Employeesempty);
            } else {
              originalEmployeeList.current = resData;

              setRows(
                resData.employees.map((obj, ind) => {
                  return { ...obj, id: ind + 1 };
                })
              );
            }
            updateMongo.current = [];
          }

          if (request === "login") {
            console.log(resData.user);
            if (resData.token) {
              localStorage.setItem("token", resData.token);
              localStorage.setItem(
                "assignedDepartment",
                resData.user.assignedDepartment
              );
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
              console.log(resData.user);
              setUserData({
                password: "",
                email: resData.user.email,
                departmentPrivileges: resData.user.departmentPrivileges,
                employeePrivileges: resData.user.employeePrivileges,
                loginPassword: "",
                loginEmail: resData.user.email,
                assignedDepartment: resData.user.assignedDepartment,
              });
            }
          }
          if (request === "departments" || request === "departments/save") {
            if (resData.abteilung.length === 0) {
              setRows(Departmentsempty);
            } else {
              setDepartments(
                resData.abteilung.map((obj, ind) => {
                  return { ...obj, id: ind + 1 };
                })
              );
            }
            updateMongoDepartment.current = [];
          }
        }
      })
      .catch((err) => console.log("chicken e", err));
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
        Employeesempty,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

const errorhandler = (error) => {
  alert(error);
};
