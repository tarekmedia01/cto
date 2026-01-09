const Notification = require('../models/Notification');
const User = require('../models/User');

const createNotification = async (users, title, message, type, additionalData = {}) => {
  try {
    const notifications = users.map((userId) => ({
      user: userId,
      title,
      message,
      type,
      ...additionalData,
    }));

    await Notification.insertMany(notifications);
    return true;
  } catch (error) {
    console.error('Error creating notifications:', error);
    return false;
  }
};

const notifyClassStudents = async (classId, title, message, type, additionalData = {}) => {
  try {
    const students = await User.find({ class: classId, role: 'student', isActive: true });
    const studentIds = students.map((student) => student._id);
    
    if (studentIds.length > 0) {
      await createNotification(studentIds, title, message, type, additionalData);
    }
    
    return true;
  } catch (error) {
    console.error('Error notifying class students:', error);
    return false;
  }
};

module.exports = {
  createNotification,
  notifyClassStudents,
};
