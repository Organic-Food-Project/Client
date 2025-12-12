import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Cart',
    template: '%s | EcoFila',
  },
  description:
    'Discover fresh, healthy, and 100% organic food online. Shop fruits, vegetables, and groceries sourced from trusted farms. Eat clean, live better with EcoFila.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="mainPadding pb-[80px] pt-[40px]">{children}</main>;
};

export default Layout;
