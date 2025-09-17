import WishlistTable from '@/components/WishlistComponents/WishlistTable';
import React from 'react';

const metaData = {
  total: 100,
  limit: 15,
};

const Wishlist = () => {
  return (
    <div>
      <h1 className="text-heading-05 font-bold text-center pb-8">
        My Wishlist
      </h1>
      <WishlistTable metaData={metaData} />
    </div>
  );
};

export default Wishlist;
