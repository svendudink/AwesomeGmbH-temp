/////////////////////////////////////////Sven's//Coding////////////////////////////////
// View edit and add departments
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

//imports
import React, { useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";
import EditTableSD from "../components/table/EditTableSD";
import { websiteColor } from "../config/config";
function Departments() {
  const {
    ApiCall,
    departments,
    setDepartments,
    loggedIn,
    updateMongoDepartment,
    privileges,
    employeeCount,
  } = useContext(ApiContext);

  useEffect(() => {
    ApiCall("departments");
  }, []);

  const fields = {
    _id: `TEMPID${departments.length + 1}`,
    abteilung: "",
  };

  return (
    <div
      style={{
        position: "obsolute",
        textAlign: "center",
        height: "auto",
        width: "40%",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        // top: "50%",
        // left: "50%",
        marginTop: "50px",
        marginLeft: "30%",
        marginRight: "30%",
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
        src={"dep"}
        key={"HEADxcm"}
        privileges={privileges}
        setRows={setDepartments}
        rows={departments}
        apiCall={() => ApiCall("departments/save")}
        fields={fields}
        updateMongo={updateMongoDepartment}
        loggedIn={loggedIn}
        departments={departments}
      />
    </div>
  );
}

export default Departments;
