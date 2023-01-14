import React, { useEffect } from "react";

import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";
import EditTableSD from "../components/table/EditTableSD";

function Departments() {
  const {
    ApiCall,
    departments,
    setDepartments,
    loggedIn,
    updateMongoDepartment,
  } = useContext(ApiContext);

  useEffect(() => {
    ApiCall("departments");
  }, []);

  const fields = {
    _id: `TEMPID${departments.length + 1}`,
    abteilung: "",
  };

  console.log(departments);
  console.log(loggedIn);

  return (
    <>
      <EditTableSD
        src={"dep"}
        key={"HEADxcm"}
        privilege={localStorage.getItem("departmentPrivilegessettings")}
        setRows={setDepartments}
        rows={departments}
        apiCall={() => ApiCall("departments/save")}
        fields={fields}
        updateMongo={updateMongoDepartment}
        loggedIn={loggedIn}
        departments={departments}
      />
    </>
  );
}

export default Departments;
