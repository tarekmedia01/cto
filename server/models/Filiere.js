const mongoose = require('mongoose');

const filiereSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Filiere name is required'],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Filiere code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 3,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Filiere', filiereSchema);
