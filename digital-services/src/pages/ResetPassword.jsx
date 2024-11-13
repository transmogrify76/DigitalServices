import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("API Endpoint:", process.env.REACT_APP_API_ENDPOINT);
    console.log("API Key:", process.env.REACT_APP_API_KEY);
    
    try {
      const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/forgot-password`;
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
        console.log("Password reset request sent:", result);
        // Optionally, redirect or show a success message
      } else {
        const errorData = await response.json();
        console.error("Error resetting password:", errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Reset Your Password</h2>
          <p className="text-center text-blue-600 mb-6">Enter your email address to receive a password reset link</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Send Reset Link
            </button>
            <div className="flex justify-between items-center text-sm text-blue-700">
              <div>
                <a href="/login" className="hover:underline">Back to Login</a>
              </div>
              <div>
                <a href="/signup" className="hover:underline">Create an Account</a>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResetPassword;
