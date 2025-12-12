import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Terms and conditions for using EcoFila organic food delivery service',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="mainPadding pb-[80px] pt-[40px]">{children}</main>;
};

export default Layout;
