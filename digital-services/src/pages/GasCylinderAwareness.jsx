import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GasCylinderAwareness = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-yellow-800 mb-6">Gas Cylinder Safety Awareness</h2>
          <p className="text-center text-yellow-600 mb-6">
            Gas cylinders are commonly used in households and industries, but improper handling can lead to serious accidents. This page aims to educate and promote safety practices to prevent mishaps.
          </p>
          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">Why Is Gas Cylinder Safety Important?</h3>
              <p className="text-yellow-600">
                Gas cylinders contain highly flammable materials. Ensuring proper handling, storage, and usage is crucial for preventing accidents like leaks, fires, or explosions. Awareness is key to protecting yourself and those around you.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">Do's of Gas Cylinder Usage</h3>
              <ul className="list-disc pl-6 space-y-2 text-yellow-600">
                <li>Ensure proper ventilation when using gas cylinders.</li>
                <li>Check for leaks regularly using soapy water.</li>
                <li>Store cylinders in an upright position and in a cool, dry area.</li>
                <li>Keep cylinders away from heat sources and open flames.</li>
                <li>Use only approved regulators and valves for gas connections.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">Don'ts of Gas Cylinder Usage</h3>
              <ul className="list-disc pl-6 space-y-2 text-yellow-600">
                <li>Do not store cylinders in basements or areas with poor ventilation.</li>
                <li>Never store cylinders near electrical appliances or flammable materials.</li>
                <li>Do not attempt to repair or modify gas cylinders yourself.</li>
                <li>Never leave cylinders unattended in high-traffic areas.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">Emergency Procedure</h3>
              <p className="text-yellow-600">
                In the event of a gas leak or explosion:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-yellow-600">
                <li>Turn off the gas supply immediately.</li>
                <li>Evacuate the area and contact emergency services.</li>
                <li>Do not use electrical devices or phones in the affected area.</li>
                <li>If safe, move the cylinder to an open area away from any ignition sources.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-yellow-700">How You Can Help Promote Safety</h3>
              <p className="text-yellow-600">
                By following safety guidelines and spreading awareness, we can prevent accidents. Educate your family, friends, and community members about the importance of gas cylinder safety.
              </p>
              <button className="w-full bg-yellow-700 text-white py-3 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300">
                Join the Movement for Gas Safety
              </button>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GasCylinderAwareness;
