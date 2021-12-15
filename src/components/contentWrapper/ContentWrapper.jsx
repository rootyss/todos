import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar.jsx';
import Footer from '../footer/Footer.jsx';

const ContentWrapper = () => (
  <>
    <Navbar />
    <div className="content-wrapper">
      <Outlet />
    </div>
    <Footer />
  </>
);

export default ContentWrapper;
