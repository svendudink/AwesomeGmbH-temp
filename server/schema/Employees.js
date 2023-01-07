import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  Vorname: {
    type: String,
    required: true,
  },
  Nachname: {
    type: String,
    required: false,
  },
  Strasse: {
    type: String,
    required: false,
  },
  Nr: {
    type: String,
    required: false,
  },
  PLZ: {
    type: String,
    required: false,
  },
  Ort: {
    type: String,
    required: false,
  },
  Land: {
    type: String,
    required: false,
  },
  Position: {
    type: String,
    required: false,
  },
  Abteilung: {
    type: String,
    required: false,
  },
});

const Employees = mongoose.model("Employees", employeeSchema);

export default Employees;
