import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  const isInterviewPage = location.pathname.startsWith('/interview');

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      {!isInterviewPage && <Navbar />}
      <main className="flex-1 w-full h-full relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
