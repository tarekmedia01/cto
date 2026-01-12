const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Subject code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    filiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Filiere',
      required: true,
    },
    level: {
      type: String,
      enum: ['1', '2', '3', '4', '5'],
      required: true,
    },
    semester: {
      type: String,
      enum: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'],
      required: true,
    },
    credits: {
      type: Number,
      default: 3,
    },
    coefficient: {
      type: Number,
      default: 1,
    },
    instructor: {
      type: String,
      trim: true,
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

subjectSchema.index({ filiere: 1, level: 1, semester: 1 });

module.exports = mongoose.model('Subject', subjectSchema);
