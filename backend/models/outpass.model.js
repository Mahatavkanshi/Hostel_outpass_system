const mongoose = require('mongoose');

const outpassSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason: String,
  placeOfVisit: String,
  dateOfLeaving: Date,
  timeOut: String,
  timeIn: String,
  emergencyContact: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  remarks: String
}, { timestamps: true });

module.exports = mongoose.model('OutpassRequest', outpassSchema);
