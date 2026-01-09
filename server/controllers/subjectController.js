const Subject = require('../models/Subject');

const getSubjects = async (req, res) => {
  try {
    const { filiere, level, semester } = req.query;
    
    let query = { isActive: true };

    if (filiere) query.filiere = filiere;
    if (level) query.level = level;
    if (semester) query.semester = semester;

    const subjects = await Subject.find(query)
      .populate('filiere')
      .sort({ name: 1 });

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('filiere');

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubject = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      filiere,
      level,
      semester,
      credits,
      coefficient,
      instructor,
    } = req.body;

    const subject = await Subject.create({
      name,
      code,
      description,
      filiere,
      level,
      semester,
      credits,
      coefficient,
      instructor,
    });

    const populatedSubject = await Subject.findById(subject._id).populate('filiere');

    res.status(201).json(populatedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      level,
      semester,
      credits,
      coefficient,
      instructor,
      isActive,
    } = req.body;

    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    if (name) subject.name = name;
    if (code) subject.code = code;
    if (description) subject.description = description;
    if (level) subject.level = level;
    if (semester) subject.semester = semester;
    if (credits) subject.credits = credits;
    if (coefficient) subject.coefficient = coefficient;
    if (instructor) subject.instructor = instructor;
    if (typeof isActive !== 'undefined') subject.isActive = isActive;

    await subject.save();

    const populatedSubject = await Subject.findById(subject._id).populate('filiere');

    res.json(populatedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    await subject.deleteOne();

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
