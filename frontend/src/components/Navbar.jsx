import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Link } from 'react-router';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, handleLogout } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm px-6 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Interview Master Logo" className="w-10 h-10 object-contain rounded-md" />
        <span className="text-xl font-bold text-gray-900 hidden sm:block">Interview Master</span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#8CC0EB] text-gray-900 font-bold rounded-full flex items-center justify-center uppercase shadow-sm">
            {user?.username?.charAt(0) || 'U'}
          </div>
          <span className="font-medium text-gray-800 hidden sm:block">
            {user?.username || 'Guest'}
          </span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
