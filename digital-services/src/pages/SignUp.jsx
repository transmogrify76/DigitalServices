import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    pin_code: "",
  });

  const navigate = useNavigate(); // Initialize navigate from useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log API endpoint and API key to confirm values are correctly loaded
    console.log("API Endpoint:", process.env.REACT_APP_API_ENDPOINT);
    console.log("API Key:", process.env.REACT_APP_API_KEY);

    try {
      const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/signup`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully", result);

        // Redirect user to login page after successful signup
        navigate("/login"); // Use navigate to redirect
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6 sm:p-10 space-y-6 overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Create Your Account</h2>
          <div className="overflow-y-auto max-h-[450px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "password", "phone_number", "address", "pin_code",].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-blue-700 capitalize">{field.replace('_', ' ')}</label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Register Now
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SignUp;
