import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Wishlist',
  description:
    'Learn about EcoFila mission to deliver organic and healthy food products',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="mainPadding pb-[80px] pt-[40px]">{children}</main>;
};

export default Layout;
