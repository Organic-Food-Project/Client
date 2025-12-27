/* eslint-disable @typescript-eslint/no-explicit-any */
import Query from '@/lib/Query';
import React, { Suspense } from 'react';
import MyCart from './components/MyCart';
import MyCartLoading from './components/MyCartLoading';

const Cart = async () => {
  const cartPromise: Promise<{ data: any | null; error: any | null }> = Query({
    api: 'v1/cart',
  });

  return (
    <>
      <h1 className="text-heading-05 font-bold text-center pb-[32px]">
        My Shopping Cart
      </h1>
      <Suspense fallback={<MyCartLoading />}>
        <GetAllCart promise={cartPromise} />
      </Suspense>
    </>
  );
};

const GetAllCart = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const cart = await promise;

  if (cart?.error) return cart.error;

  return <MyCart data={cart?.data?.data} />;
};

export default Cart;
