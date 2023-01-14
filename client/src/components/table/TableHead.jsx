/////////////////////////////////////////Sven's//Coding////////////////////////////////  
 // Head of table  
 /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////


import { TableCell, TableHead, TableRow } from "@material-ui/core";

export default function TableHeadSD(props) {
  return (
    <TableHead>
      <TableRow>
        {Object.keys(props.rows[0]).map((element, i) => {
          return element !== "id" && element !== "__v" && element !== "_id" ? (
            <TableCell>{element}</TableCell>
          ) : (
            <></>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
