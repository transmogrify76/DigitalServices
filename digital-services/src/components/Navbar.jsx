import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if user is logged in by looking for a token in local storage
  useEffect(() => {
    const userToken = localStorage.getItem('user'); // replace 'user' with the actual key if different
    setIsLoggedIn(!!userToken); // true if token exists, false otherwise
  }, []);

  // Check if the current route is either "/home" or "/login" or the root route
  const isHomeOrLoginPage = location.pathname === '/home' || location.pathname === '/login' || location.pathname === '/';
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <header className="bg-blue-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left Section: Logo and Title */}
        <div className="flex items-center space-x-3">
          {/* Official Logo with Link to Home */}
          <Link to="/home">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Emblem_of_West_Bengal_%282018-present%29.svg/800px-Emblem_of_West_Bengal_%282018-present%29.svg.png"
              alt="Government Logo"
              className="h-20"
            />
          </Link>
          <h1 className="text-3xl font-semibold">Energy Tracking Services</h1>
        </div>

        {/* Right Section: Navigation Links and Profile Icon */}
        <div className="flex items-center space-x-4">
          {/* Conditionally Render SignUp Button */}
          {!isLoggedIn && isHomeOrLoginPage && (
            <button
              onClick={() => window.location.href = '/signup'}
              className="bg-blue-600 text-white py-2 px-10 rounded-md hover:bg-blue-700"
            >
              SignUp
            </button>
          )}

          {/* Conditionally Render My Profile Icon on the Right */}
          {isLoggedIn && isDashboardPage && (
            <Link to="/profile" className="text-white hover:text-gray-200">
              <i className="fa fa-user-circle text-3xl" aria-hidden="true"></i>
            </Link>
          )}

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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-blue-700 text-white py-4 md:hidden">
          <div className="container mx-auto">
            <nav className="space-y-4">
              {!isLoggedIn && isHomeOrLoginPage && (
                <button
                  onClick={() => window.location.href = '/signup'}
                  className="w-full text-left py-2 px-6 rounded-md hover:bg-blue-600"
                >
                  SignUp
                </button>
              )}
              {/* Conditionally Render My Profile Icon in Mobile Menu */}
              {isLoggedIn && isDashboardPage && (
                <Link to="/profile" className="w-full text-left py-2 px-6 rounded-md hover:bg-blue-600 flex items-center">
                  <i className="fa fa-user-circle text-xl mr-2"></i> My Profile
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
