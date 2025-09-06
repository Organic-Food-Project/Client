import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Account',
  description:
    'Access your organic food profile to manage account details, track healthy grocery orders, and enjoy fresh, natural, and sustainable products. Shop organic fruits, vegetables, and eco-friendly food online with ease.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>hello world {children}</div>;
};

export default Layout;
