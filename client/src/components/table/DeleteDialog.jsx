/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Handling the removal of rows and gives a popup when file is deleted,
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// imports
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { websiteColor } from "../../config/config";

export default function DeleteDialog(props) {
  //usestates
  const [deleteRow, setDeleteRow] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (i) => {
    setDeleteRow(i);
    setShowConfirm(true);
  };
  //handling remove of row
  const handleRemoveClick = (i) => {
    // add to temp row and put it back to the usestate
    const list = [...props.rows];
    if (props.rows.length === 1) {
      props.setRows([props.fields]);
    } else {
      list.splice(i, 1);
      props.setRows(list);
    }

    setShowConfirm(false);
    props.setDisable(false);
    //Logic for removing from mongoDB
    if (props.rows[i]._id.substring(0, 4) === "TEMP") {
      props.updateMongo.current.splice(
        props.updateMongo.current.findIndex((row) => {
          return row._id === props.rows[i]._id;
        }),
        1
      );
    } else {
      props.updateMongo.current = [
        ...props.updateMongo.current,
        { ...props.rows[i], delete: true },
      ];
      console.log(props.updateMongo.current);
    }
  };
  //handle rejection
  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <td>
      <Button className="mr10" onClick={() => handleConfirm(props.index)}>
        <DeleteOutlineIcon sx={{ color: `${websiteColor}` }} />
      </Button>
      {showConfirm && (
        <div>
          <Dialog
            open={showConfirm}
            onClose={props.handleNo}
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
                <div style={{ color: `${websiteColor}` }}>Yes</div>
              </Button>
              <Button onClick={handleNo} color="primary" autoFocus>
                <div style={{ color: `${websiteColor}` }}>No</div>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </td>
  );
}
