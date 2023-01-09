import React, { useState } from "react";
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
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

function TableDemo() {
  // Creating style object
  const classes = useStyles();

  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([
    {
      id: 1,
      Vorname: "sven",
      Nachname: "",
      Strasse: "bs",
      Nr: "",
      PLZ: "",
      Ort: "",
      Land: "",
      Position: "",
      Abteilung: "",
    },
    {
      id: 2,
      Vorname: "paul",
      Nachname: "",
      Strasse: "",
      Nr: "",
      PLZ: "",
      Ort: "",
      Land: "",
      Position: "",
      Abteilung: "",
    },
    {
      id: 3,
      Vorname: "pim",
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

  // Initial states
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [showConfirm, setShowConfirm] = React.useState(false);

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
        id: rows.length + 1,
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
  const handleSave = () => {
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
    setDisable(true);
    setOpen(true);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
    console.log(i);
    const list = [...rows];
    list.splice(i, 1);
    setRows(list);
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <TableBody>
      {/* <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
        </Alert>
      </Snackbar> */}
      <Box margin={1}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {isEdit ? (
              <div>
                <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  ADD
                </Button>
                {rows.length !== 0 && (
                  <div>
                    {disable ? (
                      <Button disabled align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
                      </Button>
                    ) : (
                      <Button align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
                      </Button>
                    )}
                  </div>
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
        <TableRow align="center"></TableRow>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell key={"Vorname"}>Vorname</TableCell>
              <TableCell key={"Nachname"}>Nachname</TableCell>
              <TableCell key={"Strasse"}>Strasse</TableCell>
              <TableCell key={"Nr"}>Nr</TableCell>
              <TableCell key={"PLZ"}>PLZ</TableCell>
              <TableCell key={"Ort"}>Ort</TableCell>
              <TableCell key={"Land"}>Land</TableCell>
              <TableCell key={"Position"}>Position</TableCell>
              <TableCell key={"Ateilung"}>Ateilung</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return isEdit ? (
                <TableRow>
                  <TableCell padding="none">
                    <input
                      value={row.Vorname}
                      name="Vorname"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                  <TableCell padding="none">
                    <input
                      value={row.Nachname}
                      name="Nachname"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                  <TableCell padding="none">
                    <input
                      value={row.Strasse}
                      name="Strasse"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                  <TableCell padding="none">
                    <input
                      value={row.Nr}
                      name="Nr"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                  <TableCell padding="none">
                    <input
                      value={row.PLZ}
                      name="PLZ"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                  <TableCell padding="none">
                    <input
                      value={row.Ort}
                      name="Ort"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                  <TableCell padding="none">
                    <input
                      value={row.Land}
                      name="Land"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                  <TableCell padding="none">
                    <input
                      value={row.Position}
                      name="Position"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>
                  <TableCell padding="none">
                    <input
                      value={row.Abteilung}
                      name="Abteilung"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </TableCell>

                  {/* <TableCell padding="none">
                          <select
                            style={{ width: "100px" }}
                            name="city"
                            value={row.city}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="Karanja">Karanja</option>
                            <option value="Hingoli">Hingoli</option>
                            <option value="Bhandara">Bhandara</option>
                            <option value="Amaravati">Amaravati</option>
                            <option value="Pulgaon">Pulgaon</option>
                          </select>
                        </TableCell> */}
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {row.Vorname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Nachname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Strasse}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Nr}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.PLZ}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Ort}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Land}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Position}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Abteilung}
                  </TableCell>
                  <td>
                    <Button className="mr10" onClick={handleConfirm}>
                      <DeleteOutlineIcon />
                    </Button>
                  </td>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </TableBody>
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
//         <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
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
