import FileUpload from "../utils/FileUpload";

import React, { useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";
import EditTableSD from "../components/table/EditTableSD";
export default function EmployeeList(props) {
  const {
    ApiCall,
    rows,
    setRows,
    updateMongo,
    loggedIn,
    departments,
    userData,
  } = useContext(ApiContext);

  useEffect(() => {
    ApiCall("employeeList");
    ApiCall("departments");
  }, []);

  const fields = {
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
  };

  console.log(rows);

  return (
    <>
      <EditTableSD
        privilege={localStorage.getItem("employeePrivilegessettings")}
        setRows={setRows}
        rows={rows}
        assignedDepartment={localStorage.getItem("assignedDepartment")}
        apiCall={() => ApiCall("employeeList/save")}
        fields={fields}
        updateMongo={updateMongo}
        loggedIn={loggedIn}
        departments={departments}
      />
    </>
  );
}
