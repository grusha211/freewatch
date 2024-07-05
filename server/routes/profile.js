const express = require('express');
const multer = require('multer');
const { updateUserProfile, getUserProfile, uploadVideo } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
router.get('/home',authMiddleware,getUserProfile);
router.put('/update', authMiddleware, upload.single('profilePicture'), updateUserProfile);
router.post('/uploadVideo', authMiddleware, upload.single('video'), uploadVideo);

module.exports = router;
