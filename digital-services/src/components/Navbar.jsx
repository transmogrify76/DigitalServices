import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check login status and set isLoggedIn state
  useEffect(() => {
    const userToken = localStorage.getItem('user');
    console.log('User Token:', userToken);  // Log user token to check if it exists
    console.log('Current Path:', location.pathname);  // Log current path for debugging
    setIsLoggedIn(!!userToken);  // Set isLoggedIn to true if userToken exists, false otherwise
  }, [location.pathname]);

  // Determine if the current route is home, login, or root
  const isHomeOrLoginPage = location.pathname === '/home' || location.pathname === '/login' || location.pathname === '/';

  return (
    <header className="bg-blue-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Link to="/home">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Emblem_of_West_Bengal_%282018-present%29.svg/800px-Emblem_of_West_Bengal_%282018-present%29.svg.png"
              alt="Government Logo"
              className="h-20"
            />
          </Link>
          <h1 className="text-3xl font-semibold">Energy Tracking Services</h1>
        </div>

        {/* Right Section: SignUp or Profile Button */}
        <nav className="space-x-13 hidden md:flex items-center">
          {/* Show SignUp Button on Home, Login, or Root if not logged in */}
          {!isLoggedIn && isHomeOrLoginPage && (
            <button
              onClick={() => window.location.href = '/signup'}
              className="bg-blue-600 text-white py-2 px-10 rounded-md hover:bg-blue-700"
            >
              SignUp
            </button>
          )}

          {/* Show Profile Icon if logged in and on the Dashboard page */}
          {isLoggedIn && location.pathname === '/dashboard' && (
            <Link to="/myprofile" className="text-white hover:text-gray-200">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
            </Link>
          )}
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
              {/* Mobile SignUp Button */}
              {!isLoggedIn && isHomeOrLoginPage && (
                <button
                  onClick={() => window.location.href = '/signup'}
                  className="w-full text-left py-2 px-6 rounded-md hover:bg-blue-600"
                >
                  SignUp
                </button>
              )}
              {/* Mobile Profile Link */}
              {isLoggedIn && location.pathname === '/dashboard' && (
                <Link to="/myprofile" className="w-full text-left py-2 px-6 rounded-md hover:bg-blue-600 flex items-center">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png" 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
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
