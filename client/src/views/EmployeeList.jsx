import FileUpload from "../utils/FileUpload";
import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import EditableTable from "../components/EditableTable";

export default function EmployeeList() {
  return (
    <div>
      <div>
        {" "}
        <FileUpload />
        <div>
          <EditableTable />
        </div>
      </div>
    </div>
  );
}
