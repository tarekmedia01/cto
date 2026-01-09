const Resource = require('../models/Resource');
const { notifyClassStudents } = require('../utils/notificationHelper');
const fs = require('fs');
const path = require('path');

const getResources = async (req, res) => {
  try {
    const { subject, type, class: classId } = req.query;
    
    let query = { isVisible: true };

    if (req.user.role === 'student') {
      query.class = req.user.class;
    }

    if (subject) query.subject = subject;
    if (type) query.type = type;
    if (classId && req.user.role === 'admin') query.class = classId;

    const resources = await Resource.find(query)
      .populate('subject')
      .populate('class')
      .populate('uploadedBy', 'firstName lastName')
      .sort({ uploadDate: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('subject')
      .populate('class')
      .populate('uploadedBy', 'firstName lastName');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (
      req.user.role === 'student' &&
      resource.class.toString() !== req.user.class.toString()
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const { title, description, type, subject, class: classId, tags } = req.body;

    const resource = await Resource.create({
      title,
      description,
      type,
      subject,
      class: classId,
      filePath: req.file.path,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: req.user._id,
      tags: tags ? JSON.parse(tags) : [],
    });

    const populatedResource = await Resource.findById(resource._id)
      .populate('subject')
      .populate('class');

    await notifyClassStudents(
      classId,
      'New Resource Available',
      `A new ${type} has been uploaded: ${title}`,
      'resource',
      { resource: resource._id }
    );

    res.status(201).json(populatedResource);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

const updateResource = async (req, res) => {
  try {
    const { title, description, type, isVisible, tags } = req.body;

    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (title) resource.title = title;
    if (description) resource.description = description;
    if (type) resource.type = type;
    if (typeof isVisible !== 'undefined') resource.isVisible = isVisible;
    if (tags) resource.tags = JSON.parse(tags);

    await resource.save();

    const populatedResource = await Resource.findById(resource._id)
      .populate('subject')
      .populate('class')
      .populate('uploadedBy', 'firstName lastName');

    res.json(populatedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (fs.existsSync(resource.filePath)) {
      fs.unlinkSync(resource.filePath);
    }

    await resource.deleteOne();

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (
      req.user.role === 'student' &&
      resource.class.toString() !== req.user.class.toString()
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!fs.existsSync(resource.filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    resource.downloadCount += 1;
    await resource.save();

    res.download(resource.filePath, resource.fileName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  downloadResource,
};
