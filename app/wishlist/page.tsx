import WishlistTable from '@/app/wishlist/components/WishlistTable';
import Query from '@/lib/Query';
import React, { Suspense } from 'react';

const Wishlist = () => {
  return (
    <>
      <h1 className="text-heading-05 font-bold text-center pb-8">
        My Wishlist
      </h1>
      <Suspense fallback={<LoadingWishlist />}>
        <AllWishlist />
      </Suspense>
    </>
  );
};

const AllWishlist = async () => {
  const allWishlist = await Query({ api: 'v1/wishlist' });
  if (allWishlist.error) return allWishlist.error;

  return (
    <WishlistTable
      data={allWishlist.data?.data}
      metaData={allWishlist?.data?.meta}
    />
  );
};

const LoadingWishlist = () => {
  return <WishlistTable loading={true} data={[]} />;
};

export default Wishlist;
