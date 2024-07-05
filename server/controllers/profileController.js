const User = require('../models/userModel');
const Video = require('../models/video');

const updateUserProfile = async (req, res) => {
  const { description } = req.body;
  const userId = req.user.id;

  let profilePicture = req.file ? req.file.filename : null;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.description = description || user.description;
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const uploadVideo = async (req, res) => {
  const userId = req.user.id;
  const videoPath = req.file.path;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.videos.push(videoPath);
    await user.save();

    res.json({ message: 'Video uploaded successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming the user ID is set in the protect middleware
      const user = await User.findById(userId).select('-password'); // Fetch user details except password
      const videos = await Video.find({ user: userId }); // Fetch videos uploaded by the user
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        user,
        videos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
module.exports = { updateUserProfile, uploadVideo , getUserProfile};