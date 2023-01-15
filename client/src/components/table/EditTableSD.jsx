import React, { useState } from "react";
import { Table, TableBody, TableRow } from "@material-ui/core";
import FileUpload from "../../utils/FileUpload.js";

import TableHeadSD from "./TableHead.jsx";
import TableCellSD from "./TableCell.jsx";
import DeleteDialog from "./DeleteDialog.jsx";
import SaveAndEdit from "./SaveAndEdit.jsx";

export default function EditTableSD(props) {
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);

  if (props.assignedDepartment) {
    props.fields["Abteilung"] = props.assignedDepartment;
  }

  return (
    <div>
      {" "}
      {((props.src === "dep" &&
        props.privileges.current.departmentPrivileges) ||
        (props.src === "emp" && props.privileges.current.editRights)) && (
        <>
          <FileUpload />
          <SaveAndEdit
            edit={edit}
            setEdit={setEdit}
            privileges={props.privileges}
            setRows={props.setRows}
            rows={props.rows}
            setDisable={setDisable}
            apiCall={props.apiCall}
            disable={disable}
            fields={props.fields}
          />
        </>
      )}
      {`Number of Employees: ${props.employeeCount}`}
      <Table>
        <TableHeadSD rows={props.rows} />
        <TableBody>
          {props.rows.map((row, index) => {
            return (
              <TableRow key={`${row[index]}${index}Table`}>
                {Object.entries(props.rows[0])
                  .filter(
                    (element) =>
                      element[0] !== "_id" &&
                      element[0] !== "__v" &&
                      element[0] !== "id"
                  )
                  .map((cell, i) => {
                    let cellType = "";
                    // Cellrules for Employeelist
                    // console.log(row, cell, i);
                    // Scenario where editing is disabled
                    if (!edit) {
                      cellType = "static";
                    } else {
                      // Scenario where user has all privileges
                      if (props.privileges.current.employeePrivileges) {
                        if (cell[0] === "Abteilung") {
                          cellType = "dropdown";
                        } else if (cell[0] === "assignedBy") {
                          cellType = "static";
                        } else {
                          cellType = "editable";
                        }
                      } else {
                        // Scenario where user has pribileges to modify its own department

                        if (
                          row["Abteilung"] ===
                          props.privileges.current.assignedDepartment
                        ) {
                          if (cell[0] === "Abteilung") {
                            cellType = "static";
                          } else if (cell[0] === "assignedBy") {
                            cellType = "static";
                          } else {
                            cellType = "editable";
                          }
                        } else {
                          cellType = "static";
                        }
                      }
                    }

                    return (
                      <TableCellSD
                        key={`${row[i]}${i}Cell`}
                        updateMongo={props.updateMongo}
                        setRows={props.setRows}
                        rows={props.rows}
                        setDisable={setDisable}
                        value={row[cell[0]]}
                        rowname={cell[0]}
                        index={index}
                        type={cellType}
                        row={row}
                        departments={props.departments}
                      />
                    );
                  })}

                {(row["Abteilung"] ===
                  props.privileges.current.assignedDepartment ||
                  props.privileges.current.employeePrivileges) &&
                  edit && (
                    <DeleteDialog
                      key={`${row[index]}${index}Bin`}
                      setRows={props.setRows}
                      rows={props.rows}
                      updateMongo={props.updateMongo}
                      index={index}
                      setDisable={setDisable}
                      fields={props.fields}
                    />
                  )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
