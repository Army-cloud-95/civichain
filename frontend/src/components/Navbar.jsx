
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoooo.png";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();

  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-soft">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-black "
          >
            <img src={logo} alt="CiviChain Logo" className="h-8 w-auto" />
            <span className="gradient-text">CiviChain</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <Link 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'text-primary bg-blue-50' 
                  : 'text-gray-600 hover:text-primary hover:bg-blue-50'
              }`}
              to="/"
            >
              Home
            </Link>
            <Link 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === '/feed' 
                  ? 'text-primary bg-blue-50' 
                  : 'text-gray-600 hover:text-primary hover:bg-blue-50'
              }`}
              to="/feed"
            >
              View Listings
            </Link>
            <Link 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === '/report' 
                  ? 'text-primary bg-blue-50' 
                  : 'text-gray-600 hover:text-primary hover:bg-blue-50'
              }`}
              to="/report"
            >
              Report an Issue
            </Link>
            <Link 
              className="ml-2 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
              to="/login"
            >
              Login
            </Link>
            <select
              className="ml-4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm bg-white"
              value={language}
              onChange={handleLanguageChange}
              style={{ minWidth: 100 }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
