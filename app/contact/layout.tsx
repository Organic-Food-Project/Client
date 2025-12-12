import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Contact Us',
    template: '%s | EcoFila',
  },
  description:
    'Get in touch with the EcoFila team for inquiries, support, or feedback. We’re here to help you enjoy a smoother, healthier, and more natural shopping experience.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex items-center justify-center py-[80px]">
      <div className="w-[520px] bg-white rounded-[8px] dropShadow">
        {children}
      </div>
    </main>
  );
};

export default Layout;
