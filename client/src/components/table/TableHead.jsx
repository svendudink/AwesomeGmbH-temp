import { TableCell, TableHead, TableRow } from "@material-ui/core";
import uuid from "react-uuid";

export default function TableHeadSD(props) {
  console.log(props);
  return (
    <TableHead key={uuid}>
      <TableRow key={uuid}>
        {Object.keys(props.rows[0]).map((element, i) => {
          return element !== "id" && element !== "__v" && element !== "_id" ? (
            <TableCell key={uuid}>{element}</TableCell>
          ) : (
            <></>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
