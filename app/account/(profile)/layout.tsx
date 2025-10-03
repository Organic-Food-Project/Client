import React from 'react';
import { Navigation } from './components/Navigation';

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  return (
    <main className="mainPadding lg:flex gap-[24px] py-[32px]">
      <aside className="lg:w-[312px] w-full">
        <Navigation />
      </aside>
      <div className="flex-grow">{children}</div>
    </main>
  );
};

export default Layout;
