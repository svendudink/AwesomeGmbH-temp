import { TableCell, TableHead, TableRow } from "@material-ui/core";

export default function TableHeadSD(props) {
  return (
    <TableHead>
      <TableRow key={"row1"}>
        {Object.keys(props.rows[0]).map((element) => {
          console.log(element);
          return element !== "id" && element !== "__v" && element !== "_id" ? (
            <TableCell key={`${element}`}>{element}</TableCell>
          ) : (
            <></>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
