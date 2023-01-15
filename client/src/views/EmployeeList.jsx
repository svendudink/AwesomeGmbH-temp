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
    privileges,employeeCount
  } = useContext(ApiContext);

  useEffect(() => {
    (async function () {
      await ApiCall("departments");
      await ApiCall("employeeList");
    })();
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

  return (
    <>
      <EditTableSD
        employeeCount={employeeCount}
        src={"emp"}
        privileges={privileges}
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
