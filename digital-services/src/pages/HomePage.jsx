import React from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();  // Initialize navigate function

  // Handlers for button clicks
  const handleWaterClick = () => {
    navigate('/water');  // Redirect to /water page
  };
  const handleElectricityClick = () => {
    navigate('/electricity');  // Redirect to /electricity page
  };
  const handleFuelClick = () => {
    navigate('/fuel');  // Redirect to /fuel page
  };
  const handleGasClick = () => {
    navigate('/gas');  // Redirect to /gas page
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Navbar */}
      <Navbar /> 

      {/* Hero Section */}
      <section className="bg-blue-900 text-white text-center py-24">
        <h2 className="text-4xl font-bold">Track Your Daily Energy Consumption</h2>
        <p className="mt-4 text-lg">Stay informed about your usage and take control of your resources for a sustainable future.</p>
        <button className="mt-8 bg-blue-600 py-3 px-6 rounded-md text-white text-lg hover:bg-blue-700">
          Start Tracking Now
        </button>
      </section>

      {/* Energy Categories Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl text-center font-semibold text-blue-800">Track Your Energy Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {/* Water */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src="https://5.imimg.com/data5/ANDROID/Default/2021/12/AB/GQ/UQ/8012258/product-jpeg-500x500.jpg"
              alt="Water Usage"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4 text-blue-800">Water</h3>
            <p className="text-gray-600 mt-2">Monitor your daily water consumption and track usage trends.</p>
            <button 
              onClick={handleWaterClick}  // Attach the handleWaterClick function to the button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Know More
            </button>
          </div>

          {/* Electricity */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src="https://www.theindustryoutlook.com/uploaded_images/newstransfer/ctnfelectricityline450.jpg"
              alt="Electricity Usage"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4 text-blue-800">Electricity</h3>
            <p className="text-gray-600 mt-2">Track your energy consumption for a more efficient use of electricity.</p>
            <button 
              onClick={handleElectricityClick}  // Attach the handleElectricityClick function to the button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Know More
            </button>
          </div>

          {/* Fuel */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src="https://blog.feniceenergy.com/wp-content/uploads/2024/05/solar-energy-innovations-west-bengal.jpg"
              alt="Fuel Consumption"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4 text-blue-800">Fuel</h3>
            <p className="text-gray-600 mt-2">Track fuel consumption and optimize your vehicle's usage.</p>
            <button 
              onClick={handleFuelClick}  // Attach the handleFuelClick function to the button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Know More
            </button>
          </div>

          {/* Gas */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src="https://etimg.etb2bimg.com/photo/113867530.cms"
              alt="Gas Usage"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4 text-blue-800">Gas</h3>
            <p className="text-gray-600 mt-2">Keep track of your household gas consumption for better savings.</p>
            <button 
              onClick={handleGasClick}  // Attach the handleGasClick function to the button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Know More
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />  {/* Footer */}
    </div>
  );
};

export default HomePage;
