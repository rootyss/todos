import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar.jsx';
import Footer from '../footer/Footer.jsx';

const MainLayout = () => (
  <>
    <Navbar />
    <main className="container flex-grow-1">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;
