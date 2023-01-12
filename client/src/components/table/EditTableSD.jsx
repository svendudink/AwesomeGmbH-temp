import React, { useState } from "react";
import { Table, TableBody, TableRow } from "@material-ui/core";

import TableHeadSD from "./TableHead.jsx";
import TableCellSD from "./TableCell.jsx";
import DeleteDialog from "./DeleteDialog.jsx";
import SaveAndEdit from "./SaveAndEdit.jsx";
import uuid from "react-uuid";

export default function EditTableSD(props) {
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);

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
        <TableHeadSD key={uuid} rows={props.rows} />

        <TableBody>
          {props.rows.map((row, i) => {
            return !props.loggedIn.current ? (
              "Please login to view employee list"
            ) : props.privilege === "true" && edit ? (
              <TableRow key={uuid}>
                {Object.keys(row).map((cell) => {
                  console.log(cell === "Abteilung");
                  return cell !== "id" && cell !== "__v" && cell !== "_id" ? (
                    <TableCellSD
                      key={uuid}
                      updateMongo={props.updateMongo}
                      setRows={props.setRows}
                      rows={props.rows}
                      setDisable={setDisable}
                      value={row[cell]}
                      rowname={cell}
                      index={i}
                      type={cell === "Abteilung" ? "dropdown" : "editable"}
                      row={row}
                      departments={props.departments}
                    />
                  ) : (
                    <></>
                  );
                })}
                <DeleteDialog
                  setRows={props.setRows}
                  rows={props.rows}
                  updateMongo={props.updateMongo}
                  index={i}
                />
              </TableRow>
            ) : (
              <TableRow key={`${uuid}L${i}`}>
                {Object.keys(row).map((cell) => {
                  return cell !== "id" && cell !== "__v" && cell !== "_id" ? (
                    <TableCellSD
                      key={uuid}
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