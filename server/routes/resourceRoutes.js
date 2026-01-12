const express = require('express');
const router = express.Router();
const {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  downloadResource,
} = require('../controllers/resourceController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router
  .route('/')
  .get(protect, getResources)
  .post(protect, authorize('admin'), upload.single('file'), createResource);

router
  .route('/:id')
  .get(protect, getResourceById)
  .put(protect, authorize('admin'), updateResource)
  .delete(protect, authorize('admin'), deleteResource);

router.route('/:id/download').get(protect, downloadResource);

module.exports = router;
