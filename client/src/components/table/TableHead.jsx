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

// import { TableCell, TableHead, TableRow } from "@material-ui/core";

// export default function TableHeadSD(props) {
//   return (
//     <TableHead key={`${props.src}thvg`}>
//       <TableRow key={`${props.src}rowvg`}>
//         {Object.keys(props.rows[0]).filter((element, i) => {
//           return element !== "id" && element !== "__v" && element !== "_id";
//         })}
//       </TableRow>
//     </TableHead>
//   );
// }
