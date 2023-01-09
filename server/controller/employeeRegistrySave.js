import Employees from "../schema/Employees.js";

export const employeeRegistrySave = async (req, res) => {
  //Delete marked for deletion
  const markForDelete = await req.body.changeList.map((row) => {
    return row.delete ? row._id : null;
  });
  await Employees.deleteMany({ _id: markForDelete });
  //Update for MongoDB
  await req.body.changeList.forEach((row) => {
    if (!row.delete && row._id.substring(0, 4) !== "TEMP") {
      console.log("check", row._id, row);

      Employees.findByIdAndUpdate(
        row._id,
        {
          Vorname: row.Vorname,
          Nachname: row.Nachname,
          Strasse: row.Strasse,
          Nr: row.Nr,
          PLZ: row.PLZ,
          Ort: row.Ort,
          Land: row.Land,
          Position: row.Position,
          Abteilung: row.Abteilung,
        },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated User : ", docs);
          }
        }
      );
    }
  });
  //create new mongoDB
  await req.body.changeList.forEach((row) => {
    if (row._id.substring(0, 4) === "TEMP") {
      console.log(row);
      const employee = new Employees({
        Vorname: row.Vorname,
        Nachname: row.Nachname,
        Strasse: row.Strasse,
        Nr: row.Nr,
        PLZ: row.PLZ,
        Ort: row.Ort,
        Land: row.Land,
        Position: row.Position,
        Abteilung: row.Abteilung,
      });
      const createdUser = employee.save();
    }
  });
};
