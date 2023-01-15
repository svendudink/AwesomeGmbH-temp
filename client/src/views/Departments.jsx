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
    <>
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
    </>
  );
}

export default Departments;
