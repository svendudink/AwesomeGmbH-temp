/////////////////////////////////////////Sven's//Coding////////////////////////////////  
 // Tablehead 
 /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////


// imports
import { TableCell, TableHead, TableRow } from "@material-ui/core";

export default function TableHeadSD(props) {
  return (
    <TableHead>
      <TableRow>
        {Object.entries(props.rows[0])
          .filter(
            (element) =>
              element[0] !== "_id" &&
              element[0] !== "__v" &&
              element[0] !== "id"
          )
          .map((element, i) => (
            <TableCell key={i}>{element[0]}</TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}
