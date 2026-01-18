const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticate } = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', [
  authenticate,
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('specialization').trim().notEmpty().withMessage('Specialization is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('qualification').trim().notEmpty().withMessage('Qualification is required'),
  validate
], doctorController.createDoctor);

router.get('/', authenticate, doctorController.getDoctors);
router.get('/:id', authenticate, doctorController.getDoctor);
router.put('/:id', authenticate, doctorController.updateDoctor);
router.patch('/:id/availability', authenticate, doctorController.updateAvailability);
router.delete('/:id', authenticate, doctorController.deleteDoctor);

module.exports = router;
