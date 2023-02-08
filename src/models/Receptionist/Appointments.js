const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema(
  {
    AppointmentID: {
      type: String,
      unique: true,
      required: true,
    },
    DoctorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    WardenID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    
    Status: {
      type: String,
      default: "REQUESTED",
    },
    Timing: {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },

    Disease: {
      Symptoms: {
        type: Array,
        required: true,
      },
      Description: {
        type: String,
        default: "nothing",
      },
    },

    
  },
  {
    timestamps: true,
  }
);

const Appointments = mongoose.model("appointment", appointmentSchema);

module.exports = Appointments;
