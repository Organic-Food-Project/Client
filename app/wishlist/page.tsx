import WishlistTable from '@/components/WishlistComponents/WishlistTable';
import React from 'react';

const Wishlist = () => {
  const metaData = {
    total: 100,
    limit: 15,
  };

  return (
    <div>
      <h1 className="text-heading-05 font-bold text-center pb-[32px]">
        My Wishlist
      </h1>
      <WishlistTable metaData={metaData} />
    </div>
  );
};

export default Wishlist;
