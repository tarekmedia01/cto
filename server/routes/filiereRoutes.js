const express = require('express');
const router = express.Router();
const {
  getFilieres,
  getFiliereById,
  createFiliere,
  updateFiliere,
  deleteFiliere,
} = require('../controllers/filiereController');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getFilieres)
  .post(protect, authorize('admin'), createFiliere);

router
  .route('/:id')
  .get(protect, getFiliereById)
  .put(protect, authorize('admin'), updateFiliere)
  .delete(protect, authorize('admin'), deleteFiliere);

module.exports = router;
