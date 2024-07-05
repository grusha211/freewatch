import React, { useState, useEffect } from 'react';
import { updateProfile, uploadVideo, getUserProfile } from '../services/authService';
import './profile.css'; 

const Profile = () => {
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(token);
        const response = await getUserProfile(token);
        setUser(response.user);
        setVideos(response.videos);
        setDescription(response.user.description);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    if (profilePicture) formData.append('profilePicture', profilePicture);

    try {
      const response = await updateProfile(formData, token);
      alert(response.message);
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', video);

    try {
      const response = await uploadVideo(formData, token);
      alert(response.message);
    } catch (error) {
      console.error(error);
      alert('Error uploading video');
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const firstFiveVideos = showMore ? videos : videos.slice(0, 5);

  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="profile-header">
            <div className="profile-thumbnail">
              <img src={`../../../server/uploads/${user.profilePicture}`} alt="Profile" />
            </div>
            <div className="profile-username">{user.firstname}</div>
          </div>
          <form className="profile-update" onSubmit={handleProfileSubmit}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              accept="image/*"
            />
            <button type="submit" className="upload-button">Update Profile</button>
          </form>
          <div className="videos-container">
            {firstFiveVideos.map((video) => (
              <div className="video-thumbnail" key={video.id}>
                <img src={video.thumbnail} alt={video.title} />
              </div>
            ))}
          </div>
          {videos.length > 5 && (
            <div className="show-more" onClick={handleShowMore}>
              {showMore ? 'Show Less' : 'Show More'}
            </div>
          )}
          <form className="upload-video" onSubmit={handleVideoUpload}>
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              accept="video/*"
            />
            <button type="submit" className="upload-button">Upload Video</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
