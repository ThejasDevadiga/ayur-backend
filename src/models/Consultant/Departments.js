const mongoose = require("mongoose");

const departmentSchema =  mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Departments = mongoose.model("departments", departmentSchema);
module.exports = Departments;