import { TableCell, TableHead, TableRow } from "@material-ui/core";
import { useContext } from "react";
import uuid from "react-uuid";

export default function TableCellSD(props) {
  const handleInputChange = (e, index) => {
    props.setDisable(false);
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);
    const list = [...props.rows];
    console.log(list, name, value);
    list[index][name] = value;
    console.log(list[index][value]);
    console.log(list[index]);

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
      <TableCell key={uuid} padding="none">
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
      <TableCell key={uuid} padding="none">
        <select
          key={uuid}
          style={{ width: "100px" }}
          name="Abteilung"
          value={props.row.city}
          onChange={(e) => handleInputChange(e, props.index)}
        >
          <option key={uuid} value={props.row.Abteilung}>
            {props.row.Abteilung ? props.row.Abteilung : "Not assigned"}
          </option>
          {props.departments.map((option, i) => {
            return props.row.Abteilung !== option.abteilung ? (
              <option key={uuid} value={option.abteilung}>
                {option.abteilung}
              </option>
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
      <TableCell
        key={`static${props.index}${props.name}`}
        component="th"
        scope="row"
      >
        {props.value}
      </TableCell>
    );
  }
}
