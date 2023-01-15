/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Save add and edit button and logic
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// imports
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useState } from "react";

export default function SaveAndEdit(props) {
  const handleEdit = (i) => {
    props.setEdit(!props.edit);
  };
  const [addFirstmode, setAddFirstMode] = useState(true);

  const handleAdd = () => {
    console.log("does it lay here?", props.rows);
    if (props.rows.length === 1) {
      console.log("length is one", props.rows);
      const emptyCheck = Object.values(props.rows[0]).filter((el) => {
        return el !== "";
      });
      console.log("checked for emptys", emptyCheck);
      if (emptyCheck.length === 1 && addFirstmode) {
        props.setEdit(true);
        setAddFirstMode(false);
      } else {
        props.setRows([...props.rows, props.fields]);
        props.setEdit(true);
      }
    } else {
      props.setRows([...props.rows, props.fields]);
      props.setEdit(true);
    }
  };

  // Function to handle save
  const handleSave = async () => {
    props.setEdit(!props.edit);
    props.setRows(props.rows);

    props.setDisable(true);
    props.apiCall();
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {(props.privileges.current.employeePrivileges ||
          props.privileges.current.assignedDepartment) &&
        props.edit ? (
          <div>
            <Button onClick={handleAdd}>
              <AddBoxIcon onClick={handleAdd} />
              ADD
            </Button>
            {props.disable ? (
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
              <SaveIcon />
              EDIT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
