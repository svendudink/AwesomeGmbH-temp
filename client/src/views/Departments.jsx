import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CreateIcon from "@material-ui/icons/Create";

import SaveIcon from "@mui/icons-material/Save";

// import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ApiContext } from "../context/ApiContext";
import { useContext } from "react";

import TableHeadSD from "../components/table/TableHead.jsx";
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

function Departments() {
  const classes = useStyles();

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
    setDepartments([
      ...departments,
      {
        _id: `TEMPID${departments.length + 1}`,
        abteilung: "",
      },
    ]);
    setEdit(true);
    console.log(departments);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    console.log(departments);
    // If edit mode is true setEdit will
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = async () => {
    console.log(updateMongoDepartment.current);
    setEdit(!isEdit);
    setDepartments(departments);
    console.log("saved : ", departments);
    setDisable(true);
    setOpen(true);
    //the idea: compare departments with originalObj, changes are saved in updateMongoDepartment
    // howto, take new array, map over it, search matching object in old array through ID,compare objects, if something chnges, push to mongUpdate
    console.log(updateMongoDepartment.current);
    ApiCall("departments/save");
    console.log(updateMongoDepartment.current);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    console.log("checkInputCHange", name, value, e.target);
    const list = [...departments];
    console.log(list, name, value);
    list[index][name] = value;
    setDepartments(list);

    const temp = updateMongoDepartment.current.filter((row) => {
      return row._id === departments[index]._id;
    });
    if (temp.length === 0) {
      updateMongoDepartment.current.push(departments[index]);
    }
    console.log(updateMongoDepartment.current);
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
    const list = [...departments];
    list.splice(i, 1);
    if (list.length === 0) {
      setDepartments([{ abteilung: "empty" }]);
      setShowConfirm(false);
      setDisable(false);
    } else {
      setDepartments(list);
      setShowConfirm(false);
      setDisable(false);
    }
    //Logic for removing from mongoDB
    if (departments[i]._id.substring(0, 4) === "TEMP") {
      console.log("check");
      updateMongoDepartment.current.splice(
        updateMongoDepartment.current.findIndex((row) => {
          return row._id === departments[i]._id;
        }),
        1
      );
    } else {
      updateMongoDepartment.current = [
        ...updateMongoDepartment.current,
        { ...departments[i], delete: true },
      ];
    }
    console.log(updateMongoDepartment.current);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

  console.log(localStorage.getItem("departmentPrivilegessettings"));

  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {localStorage.getItem("departmentPrivilegessettings") === "false" ||
            localStorage.getItem("departmentPrivilegessettings") === null ? (
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
        {departments.length ? (
          <Table>
            <TableHeadSD rows={departments} />

            <TableBody>
              {departments.map((row, i) => {
                return !loggedIn.current ? (
                  "Please login to view Departments list"
                ) : localStorage.getItem("departmentPrivilegessettings") ===
                    "true" && isEdit ? (
                  <TableRow key={`row1${i}`}>
                    <TableCell key={"inputVorname"} padding="none">
                      <input
                        value={row.abteilung}
                        name="abteilung"
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
                              <Button
                                onClick={handleNo}
                                color="primary"
                                autoFocus
                              >
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
                    <TableCell
                      key={"viewOnlyVorname"}
                      component="th"
                      scope="row"
                    >
                      {row.abteilung}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div>Empty</div>
        )}
      </div>
    </div>
  );
}

export default Departments;
