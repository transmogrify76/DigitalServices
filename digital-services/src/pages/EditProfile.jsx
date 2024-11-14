import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    // Add any other fields you want to allow users to edit
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
    } else {
      const fetchUserData = async () => {
        try {
          const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/me`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "API-Key": process.env.REACT_APP_API_KEY,
            },
          });

          if (response.ok) {
            const result = await response.json();
            setUserData(result);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user");

    try {
      const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/update`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "API-Key": process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.error("Error updating profile:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-blue-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-700">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-700">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800"
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EditProfile;
