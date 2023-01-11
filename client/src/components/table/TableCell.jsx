import { TableCell, TableHead, TableRow } from "@material-ui/core";
import { useContext } from "react";

export default function TableCellEditSD(props) {
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

  return (
    <TableCell key={`edit${props.index}${props.name}`} padding="none">
      <input
        value={props.value}
        name={props.rowname}
        onChange={(e) => handleInputChange(e, props.index)}
      />
    </TableCell>
  );
}
