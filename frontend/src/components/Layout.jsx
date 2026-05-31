import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full h-full relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
