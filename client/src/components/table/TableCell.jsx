/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Individual cells
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// import
import { TableCell } from "@material-ui/core";

export default function TableCellSD(props) {
  // handle changing the input and update to temporaty mongo ref
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
      <TableCell
        key={`cellsel${props.rowname}${props.index}${props.value}`}
        padding="none"
      >
        <input
          autoComplete="off"
          key={`inputcellsel${props.rowname}${props.index}${props.value}`}
          autoFocus="autoFocus"
          value={props.value}
          name={props.rowname}
          onChange={(e) => handleInputChange(e, props.index)}
        />
      </TableCell>
    );
  }
  if (props.type === "dropdown") {
    return (
      <TableCell
        key={`cellstel${props.rowname}v${props.index}${props.value}`}
        padding="none"
      >
        <select
          key={`cellskjhgeltr${props.rowname}${props.index}${props.value}`}
          style={{ width: "100px" }}
          name="Abteilung"
          value={props.row.Abteilung}
          onChange={(e) => handleInputChange(e, props.index)}
        >
          <option
            key={`cellseggltr${props.rowname}${props.index}${props.value}`}
            value={props.row.Abteilung}
          >
            {props.row.Abteilung ? props.row.Abteilung : "Not assigned"}
          </option>
          {props.departments.map((option, i) => {
            return (
              props.row.Abteilung !== option.abteilung && (
                <option
                  key={`cell${option.Abteilung}${i}${props.value}bhj`}
                  value={option.abteilung}
                >
                  {option.abteilung}
                </option>
              )
            );
          })}
        </select>
      </TableCell>
    );
  }
  if (props.type === "static") {
    return (
      <TableCell
        key={`statcellsel${props.rowname}${props.index}${props.value}`}
        component="th"
        scope="row"
      >
        {props.value}
      </TableCell>
    );
  }
}
