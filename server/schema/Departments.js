import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  Abteilung: {
    type: String,
    required: false,
  },
});

const Departments = mongoose.model("Departments", departmentSchema);

export default Departments;
