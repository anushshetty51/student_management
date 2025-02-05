// layouts/RootLayout.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from '@tanstack/react-router';

const RootLayout:React.FC = () => {
 

  return (
    <div>
      <Navbar/>
      <div>
        <Outlet /> {/* Render the active route */}
      </div>
    </div>
  );
};

export default RootLayout;
