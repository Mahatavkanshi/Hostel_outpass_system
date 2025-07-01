const express = require('express');
const router = express.Router();

const {
  submitOutpass,
  getPendingOutpasses,
  reviewOutpass,
  getStudentOutpasses
} = require('../controllers/outpass.controller');

const auth = require('../middlewares/auth.middleware');
const restrictTo = require('../middlewares/role.middleware');

router.use(auth);

// Student routes
router.post('/', restrictTo('student'), submitOutpass);
router.get('/my', restrictTo('student'), getStudentOutpasses);

// Warden routes
router.get('/pending', restrictTo('warden'), getPendingOutpasses);
router.put('/:id', restrictTo('warden'), reviewOutpass);

module.exports = router;
