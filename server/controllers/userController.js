const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const { role, filiere, level, class: classId } = req.query;
    
    let query = {};

    if (role) query.role = role;
    if (filiere) query.filiere = filiere;
    if (level) query.level = level;
    if (classId) query.class = classId;

    const users = await User.find(query)
      .populate('filiere')
      .populate('class')
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('filiere')
      .populate('class')
      .select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      role,
      studentNumber,
      filiere,
      level,
      semester,
      class: classId,
      isActive,
    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (role) user.role = role;
    if (studentNumber) user.studentNumber = studentNumber;
    if (filiere) user.filiere = filiere;
    if (level) user.level = level;
    if (semester) user.semester = semester;
    if (classId) user.class = classId;
    if (typeof isActive !== 'undefined') user.isActive = isActive;

    await user.save();

    const updatedUser = await User.findById(user._id)
      .populate('filiere')
      .populate('class')
      .select('-password');

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
