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
    Hospital:{
      Name:{
          type:String,
          required:true,
      },
      Branch:{
          type:String,
          required:true,
      }
  },
  },
  {
    timestamps: true,
  }
);

const Departments = mongoose.model("departments", departmentSchema);
module.exports = Departments;