const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', [
  authenticate,
  body('patientId').isMongoId(),
  body('doctorId').isMongoId(),
  body('appointmentDate').isISO8601(),
  body('reason').trim().notEmpty(),
  validate
], appointmentController.createAppointment);

router.get('/', authenticate, appointmentController.getAppointments);
router.get('/:id', authenticate, appointmentController.getAppointment);
router.put('/:id', authenticate, appointmentController.updateAppointment);
router.delete('/:id', authenticate, appointmentController.deleteAppointment);

module.exports = router;
