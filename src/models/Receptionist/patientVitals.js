const mongoose = require("mongoose");
const vitalSignsSchema = mongoose.Schema(
  {
    vitalDataID: {
      type: String,
      required: true,
      unique:true
    },
    PatientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      require: true,
    },
    temperature: {
      type: String,
      default:"98.6°F"
    },
    weight: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    },
    pulse: {
      type: String,
      required: true,
    },
    bloodPressure: {
      systolic: {
        type: String,
        required: true,
      },
      diastolic: {
        type: String,
      },
    },
    respiratoryRate: {
      type: String,
      required: true,
    },
    
    Date: {
      type: Date,
      default: new Date(Date.now()).toDateString(),
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const VitalSigns = mongoose.model("VitalSign", vitalSignsSchema);

module.exports = VitalSigns;
