import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
import Footer from "../components/Footer"; // Assuming you have a Footer component

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To redirect the user

  useEffect(() => {
    const token = localStorage.getItem("user"); // Retrieve token from localStorage

    if (!token) {
      // If no token, navigate to login page
      navigate("/login");
    } else {
      // Fetch user data from the backend API using the token
      const fetchUserData = async () => {
        try {
          const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/me`; // Your API endpoint
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Send token in header for authentication
              "API-Key": process.env.REACT_APP_API_KEY, // Add API key if necessary
            },
          });

          if (response.ok) {
            const result = await response.json();
            setUserData(result); // Set the user data to state
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); // Stop loading after data is fetched
        }
      };

      fetchUserData();
    }
  }, [navigate]);

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
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">My Profile</h2>
          {userData ? (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700">Name</label>
                <p className="text-lg text-blue-800">{userData.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700">Email</label>
                <p className="text-lg text-blue-800">{userData.email}</p>
              </div>
              {/* Additional fields like phone, address, etc., can be added here */}
              <div className="mt-6 text-center">
                <button
                  className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={() => navigate("/editprofile")} // Navigate to the Edit Profile page
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <p className="text-lg text-red-700">User data not available</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
