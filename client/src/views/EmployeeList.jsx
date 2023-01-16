/////////////////////////////////////////Sven's//Coding////////////////////////////////
// employee list
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

//imports
import React, { useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";
import EditTableSD from "../components/table/EditTableSD";
import { websiteColor } from "../config/config";
export default function EmployeeList(props) {
  const {
    ApiCall,
    rows,
    setRows,
    updateMongo,
    loggedIn,
    departments,
    privileges,
    employeeCount,
    employeeCounter,
  } = useContext(ApiContext);


  //Loading Initial values
  useEffect(() => {
    (async function () {
      await ApiCall("departments");
      await ApiCall("employeeList");
    })();
  }, []);

  useEffect(() => {
    employeeCounter();
  }, [rows, employeeCounter]);

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
    <div
      style={{
        position: "obsolute",
        textAlign: "center",
        height: "auto",
        width: "auto",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        // top: "50%",
        // left: "50%",
        marginTop: "50px",
        marginLeft: "40px",
        marginRight: "40px",
        // height: "600px",
        // width: "200px",
        paddingTop: "10px",
        paddingLeft: "20px",
        paddingReft: "20px",
        border: `solid 3px ${websiteColor}`,
        borderRadius: "10px",
      }}
    >
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
    </div>
  );
}
