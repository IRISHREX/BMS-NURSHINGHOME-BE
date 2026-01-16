const express = require('express');
const router = express.Router();
const {
  getFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
  addFacilityService,
  updateFacilityService,
  deleteFacilityService
} = require('../controllers/facilityController');
const { authenticate, authorize } = require('../middleware/auth');

router.route('/')
  .get(authenticate, getFacilities)
  .post(authenticate, authorize('hospital_admin'), createFacility);

router.route('/:id')
  .get(authenticate, getFacilityById)
  .put(authenticate, authorize('hospital_admin'), updateFacility)
  .delete(authenticate, authorize('hospital_admin'), deleteFacility);

router.route('/:id/services')
    .post(authenticate, authorize('hospital_admin'), addFacilityService);

router.route('/:id/services/:serviceId')
    .put(authenticate, authorize('hospital_admin'), updateFacilityService)
    .delete(authenticate, authorize('hospital_admin'), deleteFacilityService);

module.exports = router;
