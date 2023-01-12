import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  departmentPrivileges: {
    type: Boolean,
    required: true,
  },
  employeePrivileges: {
    type: Boolean,
    required: true,
  },
  AssignedDepartment: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
