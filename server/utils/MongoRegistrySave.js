import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";

const MongoRegistrySave = (req, res, schema, area) => {
  jwt.verify(
    req.body.token,
    process.env.SECRET_JWT_KEY,
    async function (err, decoded) {
      if (err) {
        return { error: "invalid signature" };
      }

      const user = await User.findOne({
        _id: decoded.sub,
      });
      if (!user.employeePrivileges) {
        res.status(401).json({
          msg: "not authorized",
        });
      } else {
        const markForDelete = await req.body.changeList.map((row) => {
          return row.delete ? row._id : null;
        });
        await schema.deleteMany({ _id: markForDelete });
        //Update for MongoDB
        for (const row of req.body.changeList) {
          if (!row.delete && row._id.substring(0, 4) !== "TEMP") {
            console.log(row.Vorname);
            const check = await schema.updateOne(
              { _id: row._id },
              area === "Employees "
                ? {
                    Vorname: row.Vorname,
                    Nachname: row.Nachname,
                    Strasse: row.Strasse,
                    Nr: row.Nr,
                    PLZ: row.PLZ,
                    Ort: row.Ort,
                    Land: row.Land,
                    Position: row.Position,
                    Abteilung: row.Abteilung,
                  }
                : {
                    Abteilung: row.Abteilung,
                  }
            );
            console.log("check", check);
          }
        }

        //create new mongoDB
        for (const row of req.body.changeList) {
          console.log(row);

          if (row._id.substring(0, 4) === "TEMP") {
            const employee = new schema(
              area === "Employees "
                ? {
                    Vorname: row.Vorname,
                    Nachname: row.Nachname,
                    Strasse: row.Strasse,
                    Nr: row.Nr,
                    PLZ: row.PLZ,
                    Ort: row.Ort,
                    Land: row.Land,
                    Position: row.Position,
                    Abteilung: row.Abteilung,
                  }
                : {
                    Abteilung: row.Abteilung,
                  }
            );
            await employee.save();
          }
        }

        const employees = await schema.find();
        res.status(200).json({
          msg: "All employees",
          employees: employees,
        });
      }
    }
  );
};
export { MongoRegistrySave };
