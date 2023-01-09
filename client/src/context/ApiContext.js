import { createContext, useState, useEffect, useRef } from "react";

export const ApiContext = createContext();

export const ApiContextProvider = (props) => {
  const [userData, setUserData] = useState({
    password: "",
    email: "",
    loginPassword: "",
    loginEmail: "",
    token: "",
  });

  const updateMongo = useRef([]);
  const originalEmployeeList = useRef([]);

  const [rows, setRows] = useState([
    {
      id: 1,
      Vorname: "sven",
      Nachname: "",
      Strasse: "bs",
      Nr: "",
      PLZ: "",
      Ort: "",
      Land: "",
      Position: "",
      Abteilung: "",
    },
    {
      id: 2,
      Vorname: "paul",
      Nachname: "",
      Strasse: "",
      Nr: "",
      PLZ: "",
      Ort: "",
      Land: "",
      Position: "",
      Abteilung: "",
    },
    {
      id: 3,
      Vorname: "pim",
      Nachname: "",
      Strasse: "",
      Nr: "",
      PLZ: "",
      Ort: "",
      Land: "",
      Position: "",
      Abteilung: "",
    },
  ]);
  useEffect(() => {
    console.log(rows);
    setRows(
      rows.map((obj, ind) => {
        console.log(obj);
        return { ...obj, id: ind + 1 };
      })
    );
    console.log(rows);
  }, []);

  const [receivedData, setReceivedData] = useState("");

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
    if (request === "signup") {
      route = "/signup";
      querys = {
        email: userData.email,
        password: userData.password,
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
      };
    }
    fetch(route, {
      method: "POST",
      body: JSON.stringify(querys),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resData) => {
        originalEmployeeList.current = resData;
        console.log(resData);
        setRows(
          resData.employees.map((obj, ind) => {
            console.log(obj);
            return { ...obj, id: ind + 1 };
          })
        );
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
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};
