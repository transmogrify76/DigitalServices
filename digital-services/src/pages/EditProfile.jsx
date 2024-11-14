import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditProfile = () => {
  const [user_data, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    address: "",
    annual_income_bar: "",
    pin_code: "",
    aadhar_card_number: "",
    pan: "",
    marital_status: "",
  });
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
            setFormData({
              name: result.user_data.name,
              email: result.user_data.email,
              occupation: result.user_data.occupation,
              address: result.user_data.address,
              annual_income_bar: result.user_data.annual_income_bar,
              pin_code: result.user_data.pin_code,
              aadhar_card_number: result.user_data.aadhar_card_number,
              pan: result.user_data.pan,
              marital_status: result.user_data.martial_status,
            });
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user");

    try {
      const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/update`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "API-Key": process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
        alert("Profile updated successfully!");
        navigate("/myprofile");
      } else {
        console.error("Error updating profile");
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
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
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl transform transition-transform hover:scale-105 hover:rotate-3d p-8 sm:p-12 space-y-6 hover:shadow-xl hover:shadow-blue-400 ease-in-out duration-300">
          <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6 tracking-wide">Edit Profile</h2>
          {user_data ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-blue-800"
                    required
                  />
                </div>
               
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-blue-800"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-blue-800"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Annual Income</label>
                  <input
                    type="number"
                    name="annual_income_bar"
                    value={formData.annual_income_bar}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-blue-800"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">PIN Code</label>
                  <input
                    type="text"
                    name="pin_code"
                    value={formData.pin_code}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-blue-800"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700">Marital Status</label>
                  <input
                    type="text"
                    name="marital_status"
                    value={formData.marital_status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-blue-800"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <p className="text-lg text-red-700 font-semibold">User data not available</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EditProfile;
