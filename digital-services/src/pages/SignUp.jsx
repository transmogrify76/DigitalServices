import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    aadharNumber: "",
    panNumber: "",
    address: "",
    occupation: "",
    annualIncome: "",
    maritalStatus: "",
    familyMembers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-800 text-white py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-3">
            {/* Replace with your official logo */}
            <img
              src="https://via.placeholder.com/150x50?text=Gov+Logo"
              alt="Government Logo"
              className="h-12"
            />
            <h1 className="text-3xl font-semibold">Energy Tracking Services</h1>
          </div>
          <nav className="space-x-8">
            <a href="#home" className="hover:text-blue-200">Home</a>
            <button
              onClick={() => window.location.href='/login'}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
            >
              Login/SignUp
            </button>
          </nav>
        </div>
      </header>

      {/* SignUp Form Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg border border-blue-200 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Register for Digital Services</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Aadhar Number</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Annual Income</label>
              <input
                type="number"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Number of Family Members</label>
              <input
                type="number"
                name="familyMembers"
                value={formData.familyMembers}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none"
            >
              Register
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Energy Tracking Services. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
