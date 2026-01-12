const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, studentNumber, filiere, level, semester } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    if (role === 'student') {
      if (!studentNumber || !filiere || !level) {
        return res.status(400).json({
          message: 'Student number, filiere, and level are required for students',
        });
      }
      userData.studentNumber = studentNumber;
      userData.filiere = filiere;
      userData.level = level;
      userData.semester = semester;
    }

    const user = await User.create(userData);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Your account is inactive' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      filiere: user.filiere,
      level: user.level,
      semester: user.semester,
      class: user.class,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('filiere')
      .populate('class');

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      studentNumber: user.studentNumber,
      filiere: user.filiere,
      level: user.level,
      semester: user.semester,
      class: user.class,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
