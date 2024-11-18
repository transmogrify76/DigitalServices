import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaWater, FaBolt, FaGasPump, FaFireAlt } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDashboard = () => {
  const navigate = useNavigate();

  const [userStats, setUserStats] = useState({
    totalEnergyUsage: 350,
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

  const chartData = {
    labels: ['Water', 'Electricity', 'Fuel', 'Gas'],
    datasets: [
      {
        label: 'Energy Usage (kWh or Liters)',
        data: [
          userStats.energyStats.water,
          userStats.energyStats.electricity,
          userStats.energyStats.fuel,
          userStats.energyStats.gas,
        ],
        backgroundColor: ['#4FC3F7', '#FF7043', '#FFD54F', '#66BB6A'],
        borderWidth: 1,
      },
    ],
  };

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
    },
  };

  const handleEnergyClick = (energyType) => {
    navigate(`/${energyType}`);
  };

  const handleImportantQuestionsClick = () => {
    navigate('/questions');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4">Energy Management Dashboard</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Monitor, analyze, and optimize your energy consumption for a sustainable future.
          </p>
          <button
            onClick={handleImportantQuestionsClick}
            className="mt-8 bg-white text-blue-800 py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Answer Questions
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-tl-full rounded-tr-full"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">Your Energy Usage Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Water Usage', value: `${userStats.energyStats.water} Liters`, icon: <FaWater />, bgColor: 'bg-blue-200' },
              { title: 'Electricity Usage', value: `${userStats.energyStats.electricity} kWh`, icon: <FaBolt />, bgColor: 'bg-orange-200' },
              { title: 'Fuel Usage', value: `${userStats.energyStats.fuel} Liters`, icon: <FaGasPump />, bgColor: 'bg-yellow-200' },
              { title: 'Gas Usage', value: `${userStats.energyStats.gas} m³`, icon: <FaFireAlt />, bgColor: 'bg-green-200' },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ${item.bgColor}`}
              >
                <div className="text-4xl text-blue-800">{item.icon}</div>
                <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
                <p className="text-xl font-bold mt-2">{item.value}</p>
                <button
                  onClick={() => handleEnergyClick(item.title.toLowerCase())}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Energy Usage Breakdown</h2>
          <div className="max-w-4xl mx-auto">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Recent Activities</h2>
          <div className="space-y-4">
            {userStats.recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-700">{activity.activity}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UserDashboard;
