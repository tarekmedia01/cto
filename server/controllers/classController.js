const Class = require('../models/Class');
const User = require('../models/User');

const getClasses = async (req, res) => {
  try {
    const { filiere, level } = req.query;
    
    let query = { isActive: true };

    if (filiere) query.filiere = filiere;
    if (level) query.level = level;

    const classes = await Class.find(query)
      .populate('filiere')
      .populate('subjects')
      .sort({ name: 1 });

    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id)
      .populate('filiere')
      .populate('subjects')
      .populate('students', 'firstName lastName email studentNumber');

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    const { name, code, filiere, level, semester, academicYear, subjects } = req.body;

    const classItem = await Class.create({
      name,
      code,
      filiere,
      level,
      semester,
      academicYear,
      subjects: subjects || [],
    });

    const populatedClass = await Class.findById(classItem._id)
      .populate('filiere')
      .populate('subjects');

    res.status(201).json(populatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const { name, code, level, semester, academicYear, subjects, isActive } = req.body;

    const classItem = await Class.findById(req.params.id);

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (name) classItem.name = name;
    if (code) classItem.code = code;
    if (level) classItem.level = level;
    if (semester) classItem.semester = semester;
    if (academicYear) classItem.academicYear = academicYear;
    if (subjects) classItem.subjects = subjects;
    if (typeof isActive !== 'undefined') classItem.isActive = isActive;

    await classItem.save();

    const populatedClass = await Class.findById(classItem._id)
      .populate('filiere')
      .populate('subjects');

    res.json(populatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    await classItem.deleteOne();

    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStudentToClass = async (req, res) => {
  try {
    const { studentId } = req.body;
    const classId = req.params.id;

    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (classItem.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student already in class' });
    }

    classItem.students.push(studentId);
    await classItem.save();

    student.class = classId;
    await student.save();

    res.json({ message: 'Student added to class successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeStudentFromClass = async (req, res) => {
  try {
    const { studentId } = req.params;
    const classId = req.params.id;

    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    classItem.students = classItem.students.filter(
      (id) => id.toString() !== studentId
    );
    await classItem.save();

    await User.findByIdAndUpdate(studentId, { $unset: { class: 1 } });

    res.json({ message: 'Student removed from class successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  addStudentToClass,
  removeStudentFromClass,
};
