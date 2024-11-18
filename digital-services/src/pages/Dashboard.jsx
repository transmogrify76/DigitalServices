import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDashboard = () => {
  const navigate = useNavigate();

  const [userStats, setUserStats] = useState({
    totalEnergyUsage: 350, // Example data, can be fetched from an API
    energyStats: {
      water: 120,
      electricity: 150,
      fuel: 80,
      gas: 50,
    },
    recentActivities: [
      { activity: "Water usage increased by 10 liters", time: "2 hours ago" },
      { activity: "Electricity consumption dropped by 5 kWh", time: "4 hours ago" },
      { activity: "New fuel usage record", time: "1 day ago" },
    ],
  });

  // Chart Data
  const chartData = {
    labels: ['Water', 'Electricity', 'Fuel', 'Gas'], // Categories
    datasets: [
      {
        label: 'Energy Usage (kWh or Liters)',
        data: [
          userStats.energyStats.water,
          userStats.energyStats.electricity,
          userStats.energyStats.fuel,
          userStats.energyStats.gas,
        ], // Values
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'], // Colors for each category
        borderColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
        borderWidth: 1,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Energy Usage Breakdown',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw} ${context.dataset.label === 'Energy Usage (kWh or Liters)' ? 'kWh' : 'Liters'}`;
          },
        },
      },
    },
  };

  // Function to navigate to energy detail pages
  const handleEnergyClick = (energyType) => {
    navigate(`/${energyType}`);
  };

  // Function for handling "Answer Some Important Questions" button click
  const handleImportantQuestionsClick = () => {
    // Navigate or trigger a function for answering questions
    navigate('/questions'); // Adjust route as needed
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-900 text-white text-center py-24">
        <h2 className="text-4xl font-bold">Welcome to Your Dashboard</h2>
        <p className="mt-4 text-lg">Track your daily energy consumption and manage your resources efficiently.</p>

         {/* Button to answer important questions */}
         <div className="text-center mt-8">
          <button 
            onClick={handleImportantQuestionsClick}
            className="bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-900 transition duration-300"
          >
            Answer Some Important Questions
          </button>
        </div>
      </section>

      {/* User Stats Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl text-center font-semibold text-blue-800">Your Energy Usage Stats</h2>
        
        {/* Chart Section */}
        <div className="mt-10">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Grid for individual energy categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {/* Total Energy Usage */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-blue-800">Total Energy Usage</h3>
            <p className="text-2xl font-bold mt-4 text-blue-600">{userStats.totalEnergyUsage} kWh</p>
          </div>

          {/* Water Usage */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-blue-800">Water Usage</h3>
            <p className="text-lg text-gray-600 mt-2">{userStats.energyStats.water} Liters</p>
            <button 
              onClick={() => handleEnergyClick('water')}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              View Details
            </button>
          </div>

          {/* Electricity Usage */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-blue-800">Electricity Usage</h3>
            <p className="text-lg text-gray-600 mt-2">{userStats.energyStats.electricity} kWh</p>
            <button 
              onClick={() => handleEnergyClick('electricity')}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              View Details
            </button>
          </div>

          {/* Fuel Usage */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-blue-800">Fuel Usage</h3>
            <p className="text-lg text-gray-600 mt-2">{userStats.energyStats.fuel} Liters</p>
            <button 
              onClick={() => handleEnergyClick('fuel')}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              View Details
            </button>
          </div>

          {/* Gas Usage */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-blue-800">Gas Usage</h3>
            <p className="text-lg text-gray-600 mt-2">{userStats.energyStats.gas} m³</p>
            <button 
              onClick={() => handleEnergyClick('gas')}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        </div>

      </section>

      {/* Recent Activities Section */}
      <section className="bg-white py-16 px-4">
        <h2 className="text-3xl text-center font-semibold text-blue-800">Recent Activity</h2>
        <div className="mt-10 space-y-4">
          {userStats.recentActivities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">{activity.activity}</p>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default UserDashboard;
