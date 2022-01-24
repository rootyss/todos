import React from 'react';
import { Navigate } from 'react-router-dom';

const Information = () => (
  <div className="card">
    <div className="card-body p5 bg-white">
      <Navigate to="inbox/" />
    </div>
  </div>
);

export default Information;
