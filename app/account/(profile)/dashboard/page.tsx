import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Organic Food',
  },
  description:
    'Manage your Organic Food account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;
