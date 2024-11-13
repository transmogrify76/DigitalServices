import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WaterAwareness = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Water Usage Awareness</h2>
          <p className="text-center text-blue-600 mb-6">
            Water is a precious resource, and it's important for all of us to use it wisely. Learn how we can all take action to conserve water and reduce our environmental impact.
          </p>
          
          {/* Image of water conservation */}
          <div className="flex justify-center mb-6">
            <img 
              src="https://www.candortechspace.com/wp-content/uploads/2018/11/1-1-11-2018-feature-image-1.jpg" 
              alt="Water Conservation"
              className="w-full h-60 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-700">Why Is Water Conservation Important?</h3>
              <p className="text-blue-600">
                Freshwater is a finite resource, and our growing population and increasing water demands can strain available supplies. Conserving water helps reduce the pressure on our water systems and ensures that this vital resource remains available for future generations.
              </p>
            </section>

            {/* Tips to conserve water with an interactive slider */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-700">Tips to Conserve Water</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="list-disc pl-6 space-y-2 text-blue-600">
                  <li>Fix leaky faucets and pipes to prevent water wastage.</li>
                  <li>Take shorter showers and turn off the tap while brushing your teeth.</li>
                  <li>Use water-efficient appliances such as dishwashers and washing machines.</li>
                  <li>Collect rainwater for gardening and other non-potable uses.</li>
                </ul>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://www.engage-online.com/wp-content/uploads/2018/07/499620833.jpg" 
                    alt="Water Saving"
                    className="w-48 h-48 object-cover rounded-full shadow-md"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-700">The Impact of Water Waste</h3>
              <p className="text-blue-600">
                Wasting water can lead to a variety of environmental issues, such as depleted freshwater sources, disrupted ecosystems, and increased energy usage for water treatment. The more we waste, the more we are harming our planet.
              </p>

              {/* Interactive infographic */}
              <div className="flex justify-center">
                <img
                  src="https://parthenadesign.com/wp-content/uploads/2022/04/Wastewater-Treatment-Infographic.jpg"
                  alt="Water Waste Infographic"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-700">How You Can Get Involved</h3>
              <p className="text-blue-600">
                We can all make a difference by taking simple steps to conserve water at home and in our communities. By raising awareness, educating others, and adopting better water usage habits, we can protect this vital resource.
              </p>
              <button
                className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition duration-300 ease-in-out"
                onClick={() => alert("Thank you for joining the movement!")}
              >
                Join the Movement to Save Water
              </button>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default WaterAwareness;
