import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import Navbar from './Navbar';

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileDeleted, setIsProfileDeleted] = useState(false);

  useEffect(() => {
    
    const apiUrl = 'http://localhost:5000/api/profile';

    
    const userEmail = 'isuru@gmail.com';

    axios
      .post(apiUrl, { email: userEmail })
      .then((response) => {
        
        const userData = response.data?.user || response.data;

        if (userData) {
          
          setUserProfile(userData);
        } else {
          
          console.log('Invalid response structure:', response.data);
        }
      })
      .catch((error) => {
        
        console.error('Error fetching user profile:', error.message);
      });
  }, []); 

  const handleDeleteProfile = () => {
    
    alert('Profile deleted successfully');
    setIsProfileDeleted(true);
  };

  return (
    <div className='wrapper-profile'>
      <Navbar />
      <div className='user-profile'>
        {isProfileDeleted ? (
          <div className='empty-profile-message'>
            <p>Your profile has been deleted.</p>
          </div>
        ) : (
          <>
            {userProfile ? (
              <div>
                <h2>User Profile</h2>
                <p>Name: {userProfile.name}</p>
                <p>Email: {userProfile.email}</p>
                <button className='profile-btn-del' onClick={handleDeleteProfile}>Delete Profile</button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
