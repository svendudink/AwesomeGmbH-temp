import React, { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";

import SaveIcon from "@mui/icons-material/Save";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";
import TableHeadSD from "./table/TableHead.jsx";
import TableRowSD from "./table/TableRow";

// Creating styles
const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
  },
  snackbar: {
    bottom: "104px",
  },
});

function TableDemo(props) {
  // Creating style object
  const classes = useStyles();

  // Defining a state named rows
  // which we can update by calling on setRows function
  const { ApiCall, rows, setRows, updateMongo, loggedIn } =
    useContext(ApiContext);

  useEffect(() => {
    ApiCall("employeeList");
  }, []);

  // Initial states
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteRow, setDeleteRow] = useState(0);

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
    setRows([
      ...rows,
      {
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
      },
    ]);
    setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = async () => {
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
    setDisable(true);
    setOpen(true);
    //the idea: compare rows with originalObj, changes are saved in updateMongo
    // howto, take new array, map over it, search matching object in old array through ID,compare objects, if something chnges, push to mongUpdate

    ApiCall("employeeList/save");
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    console.log("checkInputCHange", name, value, e.target);
    const list = [...rows];
    list[index][name] = value;
    setRows(list);

    const temp = updateMongo.current.filter((row) => {
      return row._id === rows[index]._id;
    });
    if (temp.length === 0) {
      updateMongo.current.push(rows[index]);
    }
    console.log(updateMongo.current);
  };

  // Showing delete confirmation to users
  const handleConfirm = (i) => {
    setDeleteRow(i);
    setShowConfirm(true);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of
  const handleRemoveClick = (i) => {
    console.log(i);
    const list = [...rows];
    list.splice(i, 1);
    setRows(list);
    setShowConfirm(false);
    setDisable(false);
    //Logic for removing from mongoDB
    if (rows[i]._id.substring(0, 4) === "TEMP") {
      console.log("check");
      updateMongo.current.splice(
        updateMongo.current.findIndex((row) => {
          return row._id === rows[i]._id;
        }),
        1
      );
    } else {
      updateMongo.current = [
        ...updateMongo.current,
        { ...rows[i], delete: true },
      ];
    }
    console.log(updateMongo.current);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
        </Alert>
      </Snackbar>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {!localStorage.getItem("employeePrivilegessettings") ? (
            <div></div>
          ) : isEdit ? (
            <div>
              <Button onClick={handleAdd}>
                <AddBoxIcon onClick={handleAdd} />
                ADD
              </Button>
              {disable ? (
                <Button disabled align="right" onClick={handleSave}>
                  <SaveIcon />
                  SAVE
                </Button>
              ) : (
                <Button align="right" onClick={handleSave}>
                  <SaveIcon />
                  SAVE
                </Button>
              )}
            </div>
          ) : (
            <div>
              <Button onClick={handleAdd}>
                <AddBoxIcon onClick={handleAdd} />
                ADD
              </Button>
              <Button align="right" onClick={handleEdit}>
                <CreateIcon />
                EDIT
              </Button>
            </div>
          )}
        </div>
      </div>

      <Table>
        <TableHeadSD key={"THSD"} rows={rows} />

        <TableBody>
          {rows.map((row, i) => {
            return !loggedIn.current ? (
              "Please login to view employee list"
            ) : localStorage.getItem("employeePrivilegessettings") === "true" &&
              isEdit ? (
              <TableRow key={`row1${i}`}>
                <TableCell key={"inputVorname"} padding="none">
                  <input
                    value={row.Vorname}
                    name="Vorname"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell key={"inputNachname"} padding="none">
                  <input
                    value={row.Nachname}
                    name="Nachname"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell key={"inputStrasse"} padding="none">
                  <input
                    value={row.Strasse}
                    name="Strasse"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell key={"inputNr"} padding="none">
                  <input
                    value={row.Nr}
                    name="Nr"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell key={"inputPLZ"} padding="none">
                  <input
                    value={row.PLZ}
                    name="PLZ"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell key={"inputOrt"} padding="none">
                  <input
                    value={row.Ort}
                    name="Ort"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell key={"inputLand"} padding="none">
                  <input
                    value={row.Land}
                    name="Land"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell key={"inputPosition"} padding="none">
                  <input
                    value={row.Position}
                    name="Position"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <TableCell key={"inputAbteilung"} padding="none">
                  <input
                    value={row.Abteilung}
                    name="Abteilung"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </TableCell>
                <td>
                  <Button className="mr10" onClick={() => handleConfirm(i)}>
                    <DeleteOutlineIcon />
                  </Button>
                  {showConfirm && (
                    <div>
                      <Dialog
                        open={showConfirm}
                        onClose={handleNo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle i_d="alert-dialog-title">
                          {"Confirm Delete"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText i_d="alert-dialog-description">
                            Are you sure to delete
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => handleRemoveClick(deleteRow)}
                            color="primary"
                            autoFocus
                          >
                            Yes
                          </Button>
                          <Button onClick={handleNo} color="primary" autoFocus>
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}
                </td>
              </TableRow>
            ) : (
              <TableRow key={`row3${i}`}>
                <TableCell key={"viewOnlyVorname"} component="th" scope="row">
                  {row.Vorname}
                </TableCell>
                <TableCell key={"viewOnlyNachname"} component="th" scope="row">
                  {row.Nachname}
                </TableCell>
                <TableCell key={"viewOnlyStrasse"} component="th" scope="row">
                  {row.Strasse}
                </TableCell>
                <TableCell key={"viewOnlyNr"} component="th" scope="row">
                  {row.Nr}
                </TableCell>
                <TableCell key={"viewOnlyPLZ"} component="th" scope="row">
                  {row.PLZ}
                </TableCell>
                <TableCell key={"viewOnlyOrt"} component="th" scope="row">
                  {row.Ort}
                </TableCell>
                <TableCell key={"viewOnlyLand"} component="th" scope="row">
                  {row.Land}
                </TableCell>
                <TableCell key={"viewOnlyPosition"} component="th" scope="row">
                  {row.Position}
                </TableCell>
                <TableCell key={"viewOnlyAbteilung"} component="th" scope="row">
                  {row.Abteilung}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableDemo;

// {
//   showConfirm && (
//     <div>
//       <Dialog
//         open={showConfirm}
//         onClose={handleNo}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle i_d="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText i_d="alert-dialog-description">
//             Are you sure to delete
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => handleRemoveClick(i)}
//             color="primary"
//             autoFocus
//           >
//             Yes
//           </Button>
//           <Button onClick={handleNo} color="primary" autoFocus>
//             No
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
