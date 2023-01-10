import { TableCell, TableHead, TableRow } from "@material-ui/core";

export default function TableHeadSD(props) {
  console.log(props);
  return (
    <TableHead key={`headRow${props.rows.length * 0.0456564}`}>
      <TableRow key={`headRow${props.rows.length * 0.045674}`}>
        {Object.keys(props.rows[0]).map((element, i) => {
          console.log(element);
          return element !== "id" && element !== "__v" && element !== "_id" ? (
            <TableCell key={`head${element}${i}`}>{element}</TableCell>
          ) : (
            <></>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
