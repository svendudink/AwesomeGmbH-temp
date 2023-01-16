import { createContext, useState, useRef } from "react";
import { useLocation } from "react-router";

export const ApiContext = createContext();

export const ApiContextProvider = (props) => {
  //Usestates and userefs
  const loggedIn = useRef(false);
  const updateMongo = useRef([]);
  const updateMongoDepartment = useRef([]);
  const originalEmployeeList = useRef([]);
  const location = useLocation();
  const [appBarLoggedIn, setAppBarLoggedIn] = useState();
  const [employeeCount, setEmployeeCount] = useState(0);
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
  const [departments, setDepartments] = useState([
    {
      id: 1,
      _id: "TEMP8",
      abteilung: "",
    },
  ]);
  const Departmentsempty = [
    {
      _id: `TEMPID${rows.length + 1}`,
      abteilung: "",
    },
  ];

  // collection of privileges and combinations of privileges
  const privileges = useRef({
    editRights:
      localStorage.getItem("assignedDepartment") ||
      localStorage.getItem("employeePrivilegessettings") === "true",
    employeePrivileges:
      localStorage.getItem("employeePrivilegessettings") === "true",
    departmentPrivileges:
      localStorage.getItem("departmentPrivilegessettings") === "true",
    assignedDepartment: localStorage.getItem("assignedDepartment"),
    none:
      localStorage.getItem("departmentPrivilegessettings") === "false" &&
      localStorage.getItem("departmentPrivilegessettings") === "false" &&
      localStorage.getItem("employeePrivilegessettings") === "false"
        ? true
        : false,
    all:
      localStorage.getItem("departmentPrivilegessettings") === "true" &&
      localStorage.getItem("employeePrivilegessettings") === "true"
        ? true
        : false,
    employeeOnly:
      localStorage.getItem("departmentPrivilegessettings") === "false" &&
      localStorage.getItem("employeePrivilegessettings") === "true"
        ? true
        : false,
    departmentOnly:
      localStorage.getItem("departmentPrivilegessettings") === "true" &&
      localStorage.getItem("employeePrivilegessettings") === "false"
        ? true
        : false,
  });
  // count the employees
  const employeeCounter = () => {
    let employees = 0;
    if (rows.length === 1) {
      const emptyCheck = Object.values(rows[0]).filter((el) => {
        return el !== "";
      });
      if (emptyCheck.length === 1) {
        employees = 0;
      } else {
        employees = 1;
      }
    } else {
      employees = rows.length;
    }
    setEmployeeCount(employees);
  };
  // REST API
  const ApiCall = async (request) => {
    let route = "";
    let querys = {};
    // requests
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
    if (request === "verification") {
      route = "http://localhost:8080/verification";
      querys = {
        token: location.pathname.split("/")[2],
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
        // if verification email link is clicked
        if (resData.verification) {
          window.close();
          // if there is a server error
        } else if (resData.error) {
          errorhandler(resData.error);
          // alert message from serrver
        } else {
          if (resData.msg) {
            alert(resData.msg);
          }
          // if token is expired or account or department is removed
          if (resData.tokenReset) {
            console.log("check this out");
            localStorage.removeItem("token");
            localStorage.removeItem("departmentPrivilegessettings");
            localStorage.removeItem("employeePrivilegessettings");
            localStorage.removeItem("assignedDepartment");
            loggedIn.current = false;
            setAppBarLoggedIn(false);
            window.location.reload(false);
          }
          //if user want to save data
          if (request === "employeeList/save" || request === "employeeList") {
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
            employeeCounter();
          }
          // if user wants to login
          if (request === "login") {
            if (resData.user.disabled) {
              alert(
                "Account is not yet approved by your supervisor, this can take up to 24 hours\n\n as this is a demonstration project you have also received the supervisor email and you can approve your account "
              );
            } else if (resData.token) {
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
              alert("your are logged in");
            }
          }
          // if user wants to signup
          if (request === "signup") {
            console.log(resData);
          }
          if (request === "departments" || request === "departments/save") {
            if (resData.abteilung.length === 0) {
              setRows(Departmentsempty);
              return null;
            } else {
              setDepartments(
                resData.abteilung.map((obj, ind) => {
                  return obj;
                })
              );
              employeeCounter();
            }
            updateMongoDepartment.current = [];
          }
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
        Employeesempty,
        privileges,
        employeeCount,
        employeeCounter,
        appBarLoggedIn,
        setAppBarLoggedIn,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};
// any further errors
const errorhandler = (error) => {
  alert(error);
};
