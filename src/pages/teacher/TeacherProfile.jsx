import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';

const TeacherProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ name: '', email: '', bio: '', phoneNumber: '', gender: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.userID;

  useEffect(() => {
    if (!userID) return;

    axios.get(`http://localhost:5269/api/User/getprofile?userID=${userID}`)
      .then(res => {
        const data = res.data;
        setProfile(data);
        setUpdatedProfile({
          name: data.name || '',
          email: data.email || '',
          bio: data.bio || '',
          phoneNumber: data.phoneNumber || '',
          gender: data.gender || ''
        });
        if (data.profileImage) {
          sessionStorage.setItem('profileImage', data.profileImage);
        }
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        alert("Error fetching profile.");
      });
  }, [userID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("UserID", userID);
    formData.append("FullName", updatedProfile.name);
    formData.append("Email", updatedProfile.email);
    formData.append("Bio", updatedProfile.bio);
    formData.append("PhoneNumber", updatedProfile.phoneNumber);
    formData.append("Gender", updatedProfile.gender);
    if (selectedImage) {
      formData.append("ProfileImage", selectedImage);
    }

    try {
      const res = await axios.put("http://localhost:5269/api/User/updateprofile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setProfile(res.data);
      setIsModalOpen(false);
      if (res.data.profileImage) {
        sessionStorage.setItem("profileImage", res.data.profileImage);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile.");
    }
  };

  if (!profile) return <div className="text-center mt-10 text-lg">Loading profile...</div>;

  const storedImage = sessionStorage.getItem('profileImage');
  const profileImage = storedImage
    ? `http://localhost:5269${storedImage}`
    : "/images/default-avatar.png";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-sky-600 p-10 text-white text-center rounded-lg shadow-lg mb-8">
        <h2 className="text-4xl font-bold mb-2">Teacher Profile</h2>
        <p className="text-lg">Welcome, manage your profile here.</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h3>
            <form onSubmit={handleProfileUpdate}>
              <input type="text" name="name" placeholder="Full Name" value={updatedProfile.name} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
              <input type="email" name="email" placeholder="Email" value={updatedProfile.email} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full mb-3" />
              {profileImagePreview && <img src={profileImagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover mb-3" />}
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:underline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Display */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <img src={profileImage} alt="Profile" className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover" />
          <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 flex items-center gap-1 text-sm">
            <FaPencilAlt /> Edit Profile
          </button>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">{profile.name}</h2>
          <p className="text-gray-600"><strong>Role:</strong> {profile.roleId === 3 ? "Teacher" : "User"}</p>
          <p className="text-gray-600"><strong>Email:</strong> {profile.email}</p>
          {/* <p className="text-gray-600"><strong>Phone:</strong> {profile.phoneNumber || "Not set"}</p> */}
          {/* <p className="text-gray-600"><strong>Gender:</strong> {profile.gender || "Not set"}</p> */}
          {/* <p className="text-gray-600"><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p> */}
          <p className="text-gray-600 mt-2">
            <strong>Bio:</strong> {profile.bio || "I am a dedicated and passionate teacher with a strong commitment to guiding students through modern digital learning platforms. With a focus on interactive education and continuous improvement, I aim to foster an environment where learners are motivated to achieve academic excellence and build practical skills for their future careers."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
