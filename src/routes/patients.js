const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticate } = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', [
  authenticate,
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('dateOfBirth').isISO8601(),
  body('gender').isIn(['Male', 'Female', 'Other']),
  validate
], patientController.createPatient);

router.get('/', authenticate, patientController.getPatients);
router.get('/:id', authenticate, patientController.getPatient);
router.put('/:id', authenticate, patientController.updatePatient);
router.delete('/:id', authenticate, patientController.deletePatient);

module.exports = router;
