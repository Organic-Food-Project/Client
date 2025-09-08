import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex items-center justify-center py-[80px]">
      <div className="w-[520px] h-[371px] bg-white rounded-[8px] dropShadow">
        {children}
      </div>
    </main>
  );
};

export default Layout;
