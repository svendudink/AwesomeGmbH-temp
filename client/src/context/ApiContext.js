import { createContext, useState } from "react";

export const ApiContext = createContext();

export const ApiContextProvider = (props) => {
  const [userData, setUserData] = useState({
    password: "",
    email: "",
    loginPassword: "",
    loginEmail: "",
    token: "",
  });

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
    fetch(route, {
      method: "POST",
      body: JSON.stringify(querys),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resData) => {
        setReceivedData(resData);
        console.log(receivedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ApiContext.Provider value={{ ApiCall, userData, setUserData }}>
      {props.children}
    </ApiContext.Provider>
  );
};
