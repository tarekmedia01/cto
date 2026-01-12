const express = require('express');
const router = express.Router();
const {
  getCalendarEvents,
  getCalendarEventById,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} = require('../controllers/calendarController');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getCalendarEvents)
  .post(protect, authorize('admin'), createCalendarEvent);

router
  .route('/:id')
  .get(protect, getCalendarEventById)
  .put(protect, authorize('admin'), updateCalendarEvent)
  .delete(protect, authorize('admin'), deleteCalendarEvent);

module.exports = router;
