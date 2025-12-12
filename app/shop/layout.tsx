import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Shop',
    template: '%s | EcoFila',
  },
  description:
    'Discover fresh organic food, healthy products, and natural groceries online. Shop high-quality organic items for a better and healthier lifestyle.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="mainPadding pb-[80px] pt-[32px]">{children}</main>;
};

export default Layout;
