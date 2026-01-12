const Filiere = require('../models/Filiere');

const getFilieres = async (req, res) => {
  try {
    const filieres = await Filiere.find({ isActive: true }).sort({ name: 1 });
    res.json(filieres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFiliereById = async (req, res) => {
  try {
    const filiere = await Filiere.findById(req.params.id);

    if (!filiere) {
      return res.status(404).json({ message: 'Filiere not found' });
    }

    res.json(filiere);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFiliere = async (req, res) => {
  try {
    const { name, code, description, duration } = req.body;

    const filiere = await Filiere.create({
      name,
      code,
      description,
      duration,
    });

    res.status(201).json(filiere);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFiliere = async (req, res) => {
  try {
    const { name, code, description, duration, isActive } = req.body;

    const filiere = await Filiere.findById(req.params.id);

    if (!filiere) {
      return res.status(404).json({ message: 'Filiere not found' });
    }

    if (name) filiere.name = name;
    if (code) filiere.code = code;
    if (description) filiere.description = description;
    if (duration) filiere.duration = duration;
    if (typeof isActive !== 'undefined') filiere.isActive = isActive;

    await filiere.save();

    res.json(filiere);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFiliere = async (req, res) => {
  try {
    const filiere = await Filiere.findById(req.params.id);

    if (!filiere) {
      return res.status(404).json({ message: 'Filiere not found' });
    }

    await filiere.deleteOne();

    res.json({ message: 'Filiere deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFilieres,
  getFiliereById,
  createFiliere,
  updateFiliere,
  deleteFiliere,
};
