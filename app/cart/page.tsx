import Query from '@/lib/Query';
import React, { Suspense } from 'react';
import MyCart from './components/MyCart';
import MyCartLoading from './components/MyCartLoading';

const Cart = () => {
  return (
    <>
      <h1 className="text-heading-05 font-bold text-center pb-[32px]">
        My Shopping Cart
      </h1>
      <Suspense fallback={<MyCartLoading />}>
        <GetAllCart />
      </Suspense>
    </>
  );
};

const GetAllCart = async () => {
  const cart = await Query({ api: 'v1/cart' });

  if (cart.error) return cart.error;
  return <MyCart data={cart?.data?.data} />;
};

export default Cart;
