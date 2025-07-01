const Outpass = require('../models/outpass.model');

exports.submitOutpass = async (req, res) => {
  const userId = req.user.userId;
  const {
    reason,
    placeOfVisit,
    dateOfLeaving,
    timeOut,
    timeIn,
    emergencyContact
  } = req.body;

  try {
    const outpass = await Outpass.create({
      userId,
      reason,
      placeOfVisit,
      dateOfLeaving,
      timeOut,
      timeIn,
      emergencyContact
    });

    res.status(201).json({ message: 'Outpass request submitted', outpass });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit request', error: err.message });
  }
};

exports.getPendingOutpasses = async (req, res) => {
  try {
    const requests = await Outpass.find({ status: 'pending' })
      .populate('userId', 'name collegeId email');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
  }
};

exports.reviewOutpass = async (req, res) => {
  const requestId = req.params.id;
  const { status, remarks } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const request = await Outpass.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Outpass not found' });

    request.status = status;
    request.reviewedBy = req.user.userId;
    request.reviewedAt = new Date();
    request.remarks = remarks;

    await request.save();

    res.status(200).json({ message: `Outpass ${status}`, request });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update request', error: err.message });
  }
};

exports.getStudentOutpasses = async (req, res) => {
  try {
    const requests = await Outpass.find({ userId: req.user.userId });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history', error: err.message });
  }
};
