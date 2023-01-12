import React, { useState } from "react";
import { Table, TableBody, TableRow } from "@material-ui/core";

import TableHeadSD from "./TableHead.jsx";
import TableCellSD from "./TableCell.jsx";
import DeleteDialog from "./DeleteDialog.jsx";
import SaveAndEdit from "./SaveAndEdit.jsx";
import { v4 as uuidv4 } from "uuid";

export default function EditTableSD(props) {
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);

  console.log(props.assignedDepartment);

  if (props.assignedDepartment) {
    props.fields["Abteilung"] = props.assignedDepartment;
  }
  return (
    <div>
      <SaveAndEdit
        edit={edit}
        setEdit={setEdit}
        privilege={props.privilege}
        setRows={props.setRows}
        rows={props.rows}
        setDisable={setDisable}
        apiCall={props.apiCall}
        disable={disable}
        fields={props.fields}
      />
      <Table>
        <TableHeadSD rows={props.rows} />

        <TableBody>
          {props.rows.map((row, i) => {
            return !props.loggedIn.current ? (
              "Please login to view employee list"
            ) : (props.privilege === "true" || props.assignedDepartment) &&
              edit ? (
              <TableRow>
                {Object.keys(row).map((cell) => {
                  // console.log(
                  //   row["Abteilung"] === props.assignedDepartment ? row : ""
                  // );
                  let cellType = "";
                  if (props.privilege === "true") {
                    if (cell === "assignedBy") {
                      cellType = "static";
                    }
                    if (cell === "Abteilung") {
                      cellType = "dropdown";
                    } else {
                      cellType = "editable";
                    }
                  } else {
                    if (row["Abteilung"] === props.assignedDepartment) {
                      if (cell === "Abteilung" || cell === "assignedBy") {
                        cellType = "static";
                      } else {
                        cellType = "editable";
                      }
                    } else {
                      cellType = "static";
                    }
                  }

                  return cell !== "id" && cell !== "__v" && cell !== "_id" ? (
                    <TableCellSD
                      updateMongo={props.updateMongo}
                      setRows={props.setRows}
                      rows={props.rows}
                      setDisable={setDisable}
                      value={row[cell]}
                      rowname={cell}
                      index={i}
                      type={cellType}
                      row={row}
                      departments={props.departments}
                    />
                  ) : (
                    <></>
                  );
                })}
                {row["Abteilung"] === props.assignedDepartment && (
                  <DeleteDialog
                    setRows={props.setRows}
                    rows={props.rows}
                    updateMongo={props.updateMongo}
                    index={i}
                    setDisable={setDisable}
                    fields={props.fields}
                  />
                )}
              </TableRow>
            ) : (
              <TableRow>
                {Object.keys(row).map((cell) => {
                  return cell !== "id" && cell !== "__v" && cell !== "_id" ? (
                    <TableCellSD
                      updateMongo={props.updateMongo}
                      setRows={props.setRows}
                      rows={props.rows}
                      setDisable={props.setDisable}
                      value={row[cell]}
                      rowname={props.cell}
                      index={i}
                      type={"static"}
                      row={props.row}
                      departments={props.departments}
                    />
                  ) : (
                    <></>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
