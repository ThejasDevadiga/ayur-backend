const mongoose = require("mongoose");
const ConsultantList = mongoose.Schema(
  {
    EmployeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    ConsultantID: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Department: {
      type: String,
      required: true,
    },
    Specialties: {
      type: Array,
    },
    Status: {
      type: String,
      default: "Free",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConssultantList = mongoose.model("ConsultantList", ConsultantList);

module.exports = ConssultantList;
