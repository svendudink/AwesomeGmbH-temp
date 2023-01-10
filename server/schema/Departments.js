import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  abteilung: {
    type: String,
    required: true,
  },
});

const Departments = mongoose.model("Departments", departmentSchema);

export default Departments;
