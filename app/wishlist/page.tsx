import WishlistTable from '@/app/wishlist/components/WishlistTable';
import React from 'react';

const metaData = {
  total: 100,
  limit: 15,
};

const Wishlist = () => {
  return (
    <>
      <h1 className="text-heading-05 font-bold text-center pb-8">
        My Wishlist
      </h1>
      <WishlistTable metaData={metaData} />
    </>
  );
};

export default Wishlist;
