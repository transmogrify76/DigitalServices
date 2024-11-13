import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FuelAwareness = () => {
  return (
    <div className="bg-gradient-to-r from-green-100 via-green-300 to-green-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Fuel Usage Awareness</h2>
          <p className="text-center text-green-600 mb-6">
            Fuel is a vital resource for transportation and industry, but excessive use can lead to environmental harm. Learn how we can reduce fuel consumption and promote sustainable alternatives.
          </p>
          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-700">Why Reducing Fuel Consumption is Important?</h3>
              <p className="text-green-600">
                Reducing fuel consumption helps mitigate climate change, reduce pollution, and conserve non-renewable resources. It also helps reduce fuel costs, benefiting both individuals and businesses.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-700">Tips to Save Fuel</h3>
              <ul className="list-disc pl-6 space-y-2 text-green-600">
                <li>Drive smoothly and avoid sudden acceleration or braking.</li>
                <li>Maintain proper tire pressure to reduce fuel consumption.</li>
                <li>Reduce vehicle weight by removing unnecessary items.</li>
                <li>Carpool or use public transportation whenever possible.</li>
                <li>Switch off the engine when idling for long periods.</li>
                <li>Keep your vehicle well-maintained with regular oil changes and air filter replacements.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-700">The Environmental Impact of Excessive Fuel Usage</h3>
              <p className="text-green-600">
                Excessive fuel consumption contributes to air pollution, increases greenhouse gas emissions, and accelerates the depletion of fossil fuel resources. Reducing our reliance on fuel can help mitigate these effects and protect the environment.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-700">How You Can Make a Difference</h3>
              <p className="text-green-600">
                By making small changes to your daily routine and adopting fuel-saving habits, you can significantly reduce your fuel consumption. Your efforts not only help save money but also contribute to the global effort to reduce carbon emissions.
              </p>
              <button className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300">
                Join the Movement to Save Fuel
              </button>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FuelAwareness;
