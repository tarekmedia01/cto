const CalendarEvent = require('../models/CalendarEvent');
const { notifyClassStudents } = require('../utils/notificationHelper');

const getCalendarEvents = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    
    let query = {};

    if (req.user.role === 'student') {
      query.class = req.user.class;
    } else if (req.query.class) {
      query.class = req.query.class;
    }

    if (startDate && endDate) {
      query.startDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (type) {
      query.type = type;
    }

    const events = await CalendarEvent.find(query)
      .populate('subject')
      .populate('class')
      .populate('createdBy', 'firstName lastName')
      .sort({ startDate: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCalendarEventById = async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id)
      .populate('subject')
      .populate('class')
      .populate('createdBy', 'firstName lastName');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (
      req.user.role === 'student' &&
      event.class.toString() !== req.user.class.toString()
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCalendarEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      startDate,
      endDate,
      subject,
      class: classId,
      location,
      isAllDay,
      color,
    } = req.body;

    const event = await CalendarEvent.create({
      title,
      description,
      type,
      startDate,
      endDate,
      subject,
      class: classId,
      location,
      isAllDay,
      color,
      createdBy: req.user._id,
    });

    const populatedEvent = await CalendarEvent.findById(event._id)
      .populate('subject')
      .populate('class');

    await notifyClassStudents(
      classId,
      'New Calendar Event',
      `A new ${type} has been scheduled: ${title}`,
      'calendar',
      { calendarEvent: event._id }
    );

    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCalendarEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      startDate,
      endDate,
      subject,
      location,
      isAllDay,
      color,
    } = req.body;

    const event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (title) event.title = title;
    if (description) event.description = description;
    if (type) event.type = type;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;
    if (subject) event.subject = subject;
    if (location) event.location = location;
    if (typeof isAllDay !== 'undefined') event.isAllDay = isAllDay;
    if (color) event.color = color;

    await event.save();

    const populatedEvent = await CalendarEvent.findById(event._id)
      .populate('subject')
      .populate('class')
      .populate('createdBy', 'firstName lastName');

    res.json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCalendarEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCalendarEvents,
  getCalendarEventById,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
};
