const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticate } = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', [
  authenticate,
  body('name').trim().notEmpty(),
  body('specialty').trim().notEmpty(),
  validate
], doctorController.createDoctor);

router.get('/', authenticate, doctorController.getDoctors);
router.get('/:id', authenticate, doctorController.getDoctor);
router.put('/:id', authenticate, doctorController.updateDoctor);
router.delete('/:id', authenticate, doctorController.deleteDoctor);

module.exports = router;
