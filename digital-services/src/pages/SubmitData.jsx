import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SubmitData = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    month: '',
    year: '',
    waterConsumption: '',
    electricityConsumption: '',
    fuelConsumption: '',
    gasConsumption: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsSubmitting(true);
  
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const apiKey = process.env.REACT_APP_API_KEY; // API key stored in .env file
  
    const payload = {
      month: formData.month,
      year: parseInt(formData.year, 10), // Ensuring the year is sent as a number
    };
  
    try {
      const response = await fetch('http://localhost:8000/consumption/electricity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'API-Key': apiKey,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('Data submitted successfully!');
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while submitting data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-lg bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center text-blue-800 mb-4">
            Submit Consumption Data
          </h1>

          <div className="h-[400px] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              {/* Month */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="month">
                  Month
                </label>
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select Month</option>
                  {[
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="year">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter Year (e.g., 2024)"
                  required
                />
              </div>

              {/* Water Consumption */}
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="waterConsumption">
                  Water Consumption (Liters)
                </label>
                <input
                  type="number"
                  id="waterConsumption"
                  name="waterConsumption"
                  value={formData.waterConsumption}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter water consumption"
                  required
                />
              </div> */}

              {/* Electricity Consumption */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="electricityConsumption">
                  Electricity Consumption (units)
                </label>
                <input
                  type="number"
                  id="electricityConsumption"
                  name="electricityConsumption"
                  value={formData.electricityConsumption}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter electricity consumption"
                  required
                />
              </div>

              {/* Fuel Consumption */}
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="fuelConsumption">
                  Fuel Consumption (Liters)
                </label>
                <input
                  type="number"
                  id="fuelConsumption"
                  name="fuelConsumption"
                  value={formData.fuelConsumption}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter fuel consumption"
                  required
                />
              </div> */}

              {/* Gas Consumption */}
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="gasConsumption">
                  Gas Consumption (m³)
                </label>
                <input
                  type="number"
                  id="gasConsumption"
                  name="gasConsumption"
                  value={formData.gasConsumption}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter gas consumption"
                  required
                />
              </div> */}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className={`bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubmitData;
