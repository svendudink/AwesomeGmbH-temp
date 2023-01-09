import { ApiContext } from "../context/ApiContext";
import { useContext, useEffect } from "react";
import { Button } from "@mui/material";
export default function Departments() {
  const { ApiCall, userData, setUserData } = useContext(ApiContext);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleAddClick = (e) => {
    ApiCall("departments/save");
  };

  return (
    <div>
      <div> Departments</div>

      <input id="department" onChange={(e) => handleInputChange(e)} />
      <Button onClick={handleAddClick}>Add</Button>
    </div>
  );
}
