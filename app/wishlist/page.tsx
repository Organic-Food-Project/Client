import WishlistTable from '@/app/wishlist/components/WishlistTable';
import Query from '@/lib/Query';
import React from 'react';

const Wishlist = async () => {
  const allWishlist = await Query({ api: 'v1/wishlist' });
  if (allWishlist.error) return allWishlist.error;
  console.log({ Wishlist: allWishlist.data?.data });
  return (
    <>
      <h1 className="text-heading-05 font-bold text-center pb-8">
        My Wishlist
      </h1>
      <WishlistTable
        data={allWishlist.data?.data}
        metaData={allWishlist?.data?.meta}
      />
    </>
  );
};

export default Wishlist;
