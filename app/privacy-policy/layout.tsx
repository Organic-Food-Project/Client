import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Organic Food',
  description:
    'Terms and conditions for using Organic Food organic food delivery service',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="mainPadding pb-[80px] pt-[40px]">{children}</main>;
};

export default Layout;
