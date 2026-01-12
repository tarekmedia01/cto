const express = require('express');
const router = express.Router();
const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  addStudentToClass,
  removeStudentFromClass,
} = require('../controllers/classController');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getClasses)
  .post(protect, authorize('admin'), createClass);

router
  .route('/:id')
  .get(protect, getClassById)
  .put(protect, authorize('admin'), updateClass)
  .delete(protect, authorize('admin'), deleteClass);

router
  .route('/:id/students')
  .post(protect, authorize('admin'), addStudentToClass);

router
  .route('/:id/students/:studentId')
  .delete(protect, authorize('admin'), removeStudentFromClass);

module.exports = router;
