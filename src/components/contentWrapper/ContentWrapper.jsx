import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar.jsx';
import Footer from '../footer/Footer.jsx';

const ContentWrapper = () => (
  <>
    <Navbar />
    <main className="content-wrapper">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default ContentWrapper;
