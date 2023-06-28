const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema(
  {
    AppointmentID: {
      type: String,
      unique: true,
      required: true,
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
    DoctorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConsultantList",
      required:true
    },
    WardenID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WardenLists",
    },
    PatientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      require:true
    },
    Status: {
      type: String,
      default: "REQUESTED",
    },
    Reason: {
      type: String,
      default: "REQUESTED",
    },
    
    Timing: {
      date: {
        type: String,
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
        default: [],
      },
      Description: {
        type: String,
        default: "nothing",
      },
    },
    VitalsData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VitalSigns",
    },
    PrescriptionID:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "prescriptions",
    }
  },
  {
    timestamps: true,
  }
);

const Appointments = mongoose.model("appointment", appointmentSchema);

module.exports = Appointments;
