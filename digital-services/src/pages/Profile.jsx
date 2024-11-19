import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [user_data, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);  // State to hold the selected file
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
    } else {
      const fetchUserData = async () => {
        try {
          const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/profile`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "API-Key": process.env.REACT_APP_API_KEY,
            },
          });

          if (response.ok) {
            const result = await response.json();
            setUserData(result.user_data);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const token = localStorage.getItem("user");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = "http://127.0.0.1:8000/users/profile-picture/upload";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "API-Key": process.env.REACT_APP_API_KEY,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUserData(prevData => ({
          ...prevData,
          file: result.file_url,
        }));
        alert("Profile picture updated successfully.");
      } else {
        alert("Error uploading profile picture.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Error uploading profile picture.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
        <p className="text-lg text-blue-700 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center mb-12">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 sm:p-12 space-y-6 hover:shadow-2xl transition-shadow duration-500 ease-in-out h-[calc(100vh-250px)] overflow-y-auto">
          <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6 tracking-wide">My Profile</h2>
          {user_data ? (
            <div>
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <img
                  src={user_data.profile_picture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 transform transition-transform hover:scale-110 ease-in-out duration-300 shadow-lg"
                />
              </div>

              {/* Profile Picture Upload Button */}
              <div className="mb-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profile-picture-input"
                />
                <label
                  htmlFor="profile-picture-input"
                  className="cursor-pointer bg-blue-700 text-white py-3 px-8 rounded-full shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-all duration-300 hover:shadow-lg"
                >
                  Choose Profile Picture
                </label>
                <button
                  onClick={handleUpload}
                  className="mt-4 bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transform transition-all duration-300 hover:shadow-lg"
                >
                  Upload Profile Picture
                </button>
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Name</label>
                  <p className="text-lg text-blue-800 font-semibold">{user_data.name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Email</label>
                  <p className="text-lg text-blue-800 font-semibold">{user_data.email}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Address</label>
                  <p className="text-lg text-blue-800 font-semibold">{user_data.address}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">PIN Code</label>
                  <p className="text-lg text-blue-800 font-semibold">{user_data.pin_code}</p>
                </div>
               
               
                

                {/* Additional User Info */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Phone Number Verified</label>
                  <p className="text-lg text-blue-800 font-semibold">{user_data.phone_number_verified ? 'Verified' : 'Not Verified'}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">2FA Status</label>
                  <p className="text-lg text-blue-800 font-semibold">{user_data.two_fa_status ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Email Verified</label>
                  <p className="text-lg text-blue-800 font-semibold">{user_data.email_verified ? 'Verified' : 'Not Verified'}</p>
                </div>
              </div>

              {/* Profile Edit Button */}
              <div className="mt-6 text-center">
                <button
                  className="w-full sm:w-auto bg-indigo-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform transition-all duration-300 hover:shadow-lg"
                  onClick={() => navigate("/editprofile")}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-xl text-red-600">Error loading profile data</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
