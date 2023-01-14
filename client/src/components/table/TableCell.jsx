import { TableCell, TableHead, TableRow } from "@material-ui/core";
import { useContext } from "react";
import KeyGen from "../../utils/keyGen.js";

export default function TableCellSD(props) {
  const handleInputChange = (e, index) => {
    props.setDisable(false);

    const { name, value } = e.target;

    const list = [...props.rows];

    list[index][name] = value;

    props.setRows(list);

    const temp = props.updateMongo.current.filter((row) => {
      return row._id === props.rows[index]._id;
    });
    if (temp.length === 0) {
      props.updateMongo.current.push(props.rows[index]);
    }
  };
  if (props.type === "editable") {
    return (
      <TableCell padding="none">
        <input
          value={props.value}
          name={props.rowname}
          onChange={(e) => handleInputChange(e, props.index)}
        />
      </TableCell>
    );
  }
  if (props.type === "dropdown") {
    return (
      <TableCell padding="none">
        <select
          style={{ width: "100px" }}
          name="Abteilung"
          value={props.row.Abteilung}
          onChange={(e) => handleInputChange(e, props.index)}
        >
          <option value={props.row.Abteilung}>
            {props.row.Abteilung ? props.row.Abteilung : "Not assigned"}
          </option>
          {props.departments.map((option, i) => {
            return props.row.Abteilung !== option.abteilung ? (
              <option value={option.abteilung}>{option.abteilung}</option>
            ) : (
              <></>
            );
          })}
        </select>
      </TableCell>
    );
  }
  if (props.type === "static") {
    return (
      <TableCell component="th" scope="row">
        {props.value}
      </TableCell>
    );
  }
}
