import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ElectricityAwareness = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-yellow-800 mb-6">Electricity Usage Awareness</h2>
          <p className="text-center text-yellow-600 mb-6">
            Electricity is a vital part of our daily lives, but excessive consumption can have serious consequences. Learn how you can reduce energy usage and make a positive impact on the environment.
          </p>
          {/* Image Section */}
          <div className="flex justify-center mb-8">
            <img 
              src="https://www.nordicenergy-us.com/media/rr3pguc4/energy-saving-bulb.jpg" 
              alt="Electricity Conservation" 
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">Why Is Reducing Electricity Consumption Important?</h3>
              <p className="text-yellow-600">
                Reducing electricity usage helps lower carbon emissions, decrease energy costs, and conserve natural resources. The more efficiently we use electricity, the less strain is placed on our power grids, and we reduce our environmental footprint.
              </p>
            </section>

            {/* Interactive Slider */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">How Much Energy Are You Using?</h3>
              <div className="flex flex-col items-center">
                <label htmlFor="energy-slider" className="mb-2 text-yellow-600">Adjust the slider to estimate your monthly energy usage:</label>
                <input 
                  id="energy-slider" 
                  type="range" 
                  min="100" 
                  max="1000" 
                  step="50" 
                  defaultValue="500" 
                  className="w-64 h-2 bg-yellow-200 rounded-lg"
                />
                <p className="mt-2 text-yellow-600">Your estimated energy usage: <strong>500 kWh/month</strong></p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">Tips to Save Electricity</h3>
              <ul className="list-disc pl-6 space-y-2 text-yellow-600">
                <li>Turn off lights and electrical appliances when not in use.</li>
                <li>Use energy-efficient LED bulbs instead of incandescent lights.</li>
                <li>Unplug devices and chargers when they're not in use.</li>
                <li>Opt for energy-efficient appliances with the ENERGY STAR label.</li>
                <li>Set your thermostat to an energy-saving temperature (68°F in winter, 78°F in summer).</li>
                <li>Use natural light during the day instead of relying on artificial lighting.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">The Impact of High Electricity Usage</h3>
              <p className="text-yellow-600">
                High electricity consumption contributes to the overuse of natural resources, such as coal, gas, and oil. This results in higher greenhouse gas emissions, increased air pollution, and greater strain on our planet's ecosystems.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">How You Can Make a Difference</h3>
              <p className="text-yellow-600">
                Simple changes to your daily habits can make a significant difference in reducing your electricity usage. By using less energy, you help conserve resources, protect the environment, and reduce your monthly electricity bills.
              </p>
              <button className="w-full bg-yellow-700 text-white py-3 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300">
                Join the Movement to Save Electricity
              </button>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ElectricityAwareness;
