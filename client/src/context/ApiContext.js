import { createContext, useState } from "react";
import axios from "axios";

export const ApiContext = createContext();

export const ApiContextProvider = (props) => {
  const [userData, setUserData] = useState({
    password: "",
    email: "",
    loginPassword: "",
    loginEmail: "",
    token: "",
  });

  const ApiCall = async () => {
    axios
      .post("/signup", {
        firstName: "Fred",
        lastName: "Flintstone",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ApiContext.Provider value={{ ApiCall, userData, setUserData }}>
      {props.children}
    </ApiContext.Provider>
  );
};
