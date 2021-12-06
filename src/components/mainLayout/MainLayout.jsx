import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../index.js';

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
