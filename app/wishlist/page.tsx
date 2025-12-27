/* eslint-disable @typescript-eslint/no-explicit-any */
import WishlistTable from '@/app/wishlist/components/WishlistTable';
import Query from '@/lib/Query';
import React, { Suspense } from 'react';

const Wishlist = async () => {
  const wishlistPromise: Promise<{ data: any | null; error: any | null }> =
    Query({ api: 'v1/wishlist' });

  return (
    <>
      <h1 className="text-heading-05 font-bold text-center pb-8">
        My Wishlist
      </h1>

      <Suspense fallback={<LoadingWishlist />}>
        <AllWishlist promise={wishlistPromise} />
      </Suspense>
    </>
  );
};

const AllWishlist = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const allWishlist = await promise;
  if (allWishlist?.error) return allWishlist.error;

  return (
    <WishlistTable
      data={allWishlist?.data?.data}
      metaData={allWishlist?.data?.meta}
    />
  );
};

const LoadingWishlist = () => {
  return <WishlistTable loading={true} data={[]} />;
};

export default Wishlist;
