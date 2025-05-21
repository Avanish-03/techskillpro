import React, { useState, useEffect } from 'react';

const TeacherProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch teacher profile data
    setUserData({
      name: 'John Doe',
      email: 'john.doe@example.com',
      profileImage: 'https://example.com/path/to/profile.jpg',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center py-6">Teacher Profile</h1>
      <div className="max-w-lg mx-auto text-center">
        <img
          src={userData?.profileImage || 'default-profile-image.jpg'}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">{userData?.name}</h2>
        <p className="text-lg text-gray-600">{userData?.email}</p>
      </div>
    </div>
  );
};

export default TeacherProfile;
