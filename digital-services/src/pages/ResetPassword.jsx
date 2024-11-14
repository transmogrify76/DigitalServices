import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp_code: "",
    new_password: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP has been sent
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Track if the message is success or error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsSuccess(false);

    try {
      const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/password-reset/request`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setMessage("OTP sent to your email.");
        setIsOtpSent(true); // Proceed to OTP step
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      console.error("Network error:", error);
    }
  };

  const handleConfirmPasswordReset = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/users/password-reset/confirm`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify({
          email: formData.email,
          otp_code: formData.otp_code,
          new_password: formData.new_password,
        }),
      });

      if (response.ok) {
        setMessage("Password reset successful! You can now log in with your new password.");
        setIsOtpSent(false); // Reset state after success
        setIsSuccess(true); // Display success styling
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      console.error("Network error:", error);
      setIsSuccess(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
            {isOtpSent ? "Enter OTP and New Password" : "Reset Your Password"}
          </h2>
          <p className="text-center text-blue-600 mb-6">
            {isOtpSent ? "Enter the OTP sent to your email and set a new password." : "Enter your email to receive a password reset link."}
          </p>
          
          {message && (
            <p className={`text-center ${isSuccess ? "text-green-600" : "text-red-600"} mb-4 font-medium`}>
              {message}
            </p>
          )}
          
          <form onSubmit={isOtpSent ? handleConfirmPasswordReset : handleRequestOtp} className="space-y-6">
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

            {isOtpSent && (
              <>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-blue-700 mb-1">OTP Code</label>
                  <input
                    type="text"
                    name="otp_code"
                    value={formData.otp_code}
                    onChange={handleChange}
                    className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="Enter OTP code"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-blue-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="Enter new password"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {isOtpSent ? "Confirm Password Reset" : "Send Reset Link"}
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
