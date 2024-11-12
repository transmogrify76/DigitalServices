import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left Section: Logo and Title */}
        <div className="flex items-center space-x-3">
          {/* Official Logo */}
          <img
            src="https://via.placeholder.com/150x50?text=Gov+Logo"
            alt="Government Logo"
            className="h-12"
          />
          <h1 className="text-3xl font-semibold">Energy Tracking Services</h1>
        </div>

        {/* Right Section: Navigation Links */}
        <nav className="space-x-8 hidden md:flex">
          {/* SignUp/Login Button */}
          <button
            onClick={() => window.location.href='/signup'}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            SignUp/Login
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-3xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-blue-700 text-white py-4 md:hidden">
          <div className="container mx-auto">
            <nav className="space-y-4">
              <button
                onClick={() => window.location.href='/signup'}
                className="w-full text-left py-2 px-6 rounded-md hover:bg-blue-600"
              >
                SignUp/Login
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
