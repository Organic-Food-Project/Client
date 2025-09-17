import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Organic Food',
  },
  description:
    'Manage your Organic Food account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      {children}
    </main>
  );
};

export default Layout;
