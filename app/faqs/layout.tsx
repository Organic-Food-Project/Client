import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'FAQS',
    template: '%s | Organic Food',
  },
  description:
    'Find clear answers to common questions about our organic products, delivery process, packaging, and sustainability practices. Explore everything you need to know about choosing clean, healthy food with confidence.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="mainPadding pb-[80px] pt-[40px]">{children}</main>;
};

export default Layout;
