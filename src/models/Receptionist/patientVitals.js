const mongoose = require('mongoose');

const vitalSignsSchema = mongoose.Schema({
  vitalDataID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  pulse: {
    type: Number,
    required: true
  },
  bloodPressure: {
    systolic: {
      type: Number,
      required: true
    },
    diastolic: {
      type: Number,
      required: true
    }
  },
  respiratoryRate: {
    type: Number,
    required: true
  },
  oxygenSaturation: {
    type: Number
  }
}, {
  timestamps: true
});

const VitalSigns = mongoose.model('VitalSigns', vitalSignsSchema);

module.exports = VitalSigns;
