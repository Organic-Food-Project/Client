import CartTable from '@/components/CartComponents/CartTable';
import { Button } from '@/components/ui/button';
import React from 'react';

const Cart = () => {
  const metaData = {
    total: 100,
    limit: 15,
  };

  return (
    <div>
      <h1 className="text-heading-05 font-bold text-center pb-[32px]">
        My Shopping Cart
      </h1>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <CartTable metaData={metaData} />
        </div>
        <div className="col-span-2 border border-gray-100 p-6 h-fit">
          <p className="text-body-xl font-semibold pb-[7px]">Cart Total</p>
          <div className="text-body-small text-gray-700 flex justify-between py-3 border-b border-gray-100">
            <p>Subtotal:</p>
            <p className="text-black">$84.00</p>
          </div>
          <div className="text-body-small text-gray-700 flex justify-between py-3 border-b border-gray-100">
            <p>Shipping:</p>
            <p className="text-black">Free</p>
          </div>
          <div className="text-body-small text-gray-700 flex justify-between py-3">
            <p>Total:</p>
            <p className="text-black font-semibold">$84.00</p>
          </div>
          <Button className="w-full py-4 mt-5">Proceed to checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
