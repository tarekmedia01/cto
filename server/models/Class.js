const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Class code is required'],
      unique: true,
      uppercase: true,
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
    },
    academicYear: {
      type: String,
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

classSchema.index({ filiere: 1, level: 1, academicYear: 1 });

module.exports = mongoose.model('Class', classSchema);
