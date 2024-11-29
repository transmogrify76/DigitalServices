import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SubmitData = () => {
  const navigate = useNavigate();

  const [consumptionType, setConsumptionType] = useState('');
  const [formData, setFormData] = useState({
    month: '',
    year: '',
    consumption: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Utility to retrieve the token
  const getToken = () => {
    try {
      const token = localStorage.getItem('user'); 
      if (!token) {
        console.error('Token not found in localStorage');
        return null;
      }
      return token; // Directly return the token
    } catch (error) {
      console.error('Error retrieving token from localStorage:', error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (e) => {
    setConsumptionType(e.target.value);
    if (formData.consumption || formData.month || formData.year) {
      setFormData({ month: '', year: '', consumption: '' });
    }
  };

  const validateInputs = () => {
    const { year, consumption } = formData;
    const currentYear = new Date().getFullYear();

    if (!year || parseInt(year, 10) < 2000 || parseInt(year, 10) > currentYear + 5) {
      alert('Please enter a valid year.');
      return false;
    }

    if (!consumption || parseFloat(consumption) <= 0) {
      alert('Please enter a valid consumption amount.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsSubmitting(true);

    try {
      const token = getToken(); 
      if (!token) {
        alert('User is not authenticated. Please log in again.');
        navigate('/login');
        return;
      }

      const apiKey = process.env.REACT_APP_API_KEY || '';
      if (!apiKey) {
        alert('API key is missing. Please configure your environment variables.');
        return;
      }

      const endpointMap = {
        electricity: '/consumption/electricity',
        gas: '/consumption/gas',
        water: '/consumption/water',
        fuel: '/consumption/fuel',
      };

      const apiEndpoint = endpointMap[consumptionType];
      if (!apiEndpoint) {
        alert('Please select a valid consumption type.');
        return;
      }

      const payload = {
        month: formData.month,
        year: parseInt(formData.year, 10),
        consumption: parseFloat(formData.consumption),
      };

      const response = await fetch(`http://localhost:8000${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token here
          'API-Key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(
          `${consumptionType.charAt(0).toUpperCase() + consumptionType.slice(1)} data submitted successfully!`
        );
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(`An error occurred: ${error.message}. Please try again.`);
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
              {/* Consumption Type */}
              <div className="mb-4">
                <label htmlFor="consumptionType" className="block text-gray-700 font-medium mb-2">
                  Consumption Type
                </label>
                <select
                  id="consumptionType"
                  value={consumptionType}
                  onChange={handleTypeChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select Type</option>
                  {['electricity', 'gas', 'water', 'fuel'].map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div className="mb-4">
                <label htmlFor="month" className="block text-gray-700 font-medium mb-2">
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
                <label htmlFor="year" className="block text-gray-700 font-medium mb-2">
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

              {/* Consumption */}
              <div className="mb-4">
                <label htmlFor="consumption" className="block text-gray-700 font-medium mb-2">
                  {consumptionType
                    ? `${consumptionType.charAt(0).toUpperCase() + consumptionType.slice(1)} Consumption`
                    : 'Consumption'}
                </label>
                <input
                  type="number"
                  id="consumption"
                  name="consumption"
                  value={formData.consumption}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder={`Enter ${consumptionType || 'consumption'} amount`}
                  required
                  min="0"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className={`bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
