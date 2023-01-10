// import { TableCell, TableHead, TableRow } from "@material-ui/core";
// import { useState } from "react";

// export default function TableRowSD(props) {
//   console.log(props.rows);
//   return (
//     <TableRow key={"row1"}>
//       {Object.values(props.rows).map((element, i) => {
//         console.log(Object.values);
//         return element !== "id" && element !== "__v" && element !== "_id" ? (
//           <TableCell key={`input${element}`} padding="none">
//             <input
//               value={props.value}
//               name={element}
//               onChange={(e) => props.handleInputChange(e, i)}
//             />
//           </TableCell>
//         ) : (
//           <></>
//         );
//       })}
//     </TableRow>
//   );
// }
