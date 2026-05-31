import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Link } from 'react-router';
import logo from '../assets/logo.png';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {
  const { user, handleLogout } = useAuth();

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-5xl mx-auto">
        <nav className="pointer-events-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-[#BFDDF0]/20 rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 hover:bg-white/80">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 p-1">
              <img src={logo} alt="Interview Master Logo" className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110" />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 hidden sm:block tracking-tight">
              Interview Master
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50/80 rounded-full pl-2 pr-4 py-1.5 border border-gray-200/60">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#8CC0EB] to-[#BFDDF0] text-gray-900 font-bold rounded-full flex items-center justify-center uppercase shadow-sm">
                {user?.username?.charAt(0) || <UserOutlined />}
              </div>
              <span className="font-semibold text-gray-700 text-sm hidden sm:block">
                {user?.username || 'Guest'}
              </span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow active:scale-95"
            >
              <LogoutOutlined className="transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
