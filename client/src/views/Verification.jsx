/////////////////////////////////////////Sven's//Coding////////////////////////////////
// short popup fro conformation email to administrator
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import { useLocation } from "react-router";
import { useContext, useEffect } from "react";
import { ApiContext } from "../context/ApiContext";

export default function Verification() {
  const { setUserData, ApiCall } = useContext(ApiContext);
  const location = useLocation();

  console.log(location.pathname.split("/")[2]);
  setUserData({ token: location.pathname.split("/")[2] });

  useEffect(() => {
    ApiCall("verification");
  }, []);

  return (
    <div style={{ fontSize: "20px" }}>
      Request send to server, <br />
      this screen will close automatically{" "}
    </div>
  );
}
