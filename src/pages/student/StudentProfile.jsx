import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt } from "react-icons/fa";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ name: '', email: '' });
  const [selectedImage, setSelectedImage] = useState(null);

  const userID = localStorage.getItem('userID');

  useEffect(() => {
    if (!userID) return;
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(`http://localhost:5269/api/User/getprofile?userID=${userID}`);
        setProfile(res.data);
        setUpdatedProfile({
          name: res.data.name || '',
          email: res.data.email || '',
        });
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, [userID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("UserId", userID);
    formData.append("Name", updatedProfile.name);
    formData.append("Email", updatedProfile.email);
    if (selectedImage) {
      formData.append("ProfileImage", selectedImage);
    }

    try {
      const response = await axios.put("http://localhost:5269/api/User/updateprofile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            <form onSubmit={handleProfileUpdate} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedProfile.name}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={updatedProfile.email}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  name="ProfileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mt-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row p-6">
          {/* Profile Picture */}
          <div className="relative w-48 h-48 mx-auto md:mx-0 mb-4 md:mb-0">
            <img
              src={profile.profileImage || '/default-avatar.png'}  // Added default avatar as fallback
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-blue-500"
            />
          </div>

          {/* Info */}
          <div className="flex-1 md:ml-8 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-blue-700">{profile.name}</h2>
            <p className="text-gray-500 mt-1">Student</p>
            <p className="text-gray-600 mt-2"><strong>Email:</strong> {profile.email}</p>
            <p className="text-gray-600"><strong>Role ID:</strong> {profile.roleId}</p>

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile <FaPencilAlt className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
