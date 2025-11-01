'use client';

import CartTable from '@/app/cart/components/CartTable';
import { Button } from '@/components/ui/button';
import { currencyFormated } from '@/lib/utils';
import React, { useState } from 'react';

interface MyCartProps {
  data: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    quantity: number;
  }[];
}

const MyCart: React.FC<MyCartProps> = ({ data }) => {
  const [myData, setMyData] = useState(data);
  return (
    <div className="flex flex-col-reverse lg:grid grid-cols-6 gap-6">
      <div className="col-span-4">
        <CartTable setMyData={setMyData} myData={myData} />
      </div>
      <div className="lg:sticky top-[110] col-span-2 border border-gray-100 p-6 h-fit">
        <p className="text-body-xl font-semibold pb-[7px]">Cart Total</p>
        <div className="text-body-small text-gray-700 flex justify-between py-3 border-b border-gray-100">
          <p>Subtotal:</p>
          <p className="text-black">
            $
            {currencyFormated(
              myData?.reduce(
                (total: number, item: { price: number; quantity: number }) =>
                  item.price * item.quantity + total,
                0
              )
            )}
          </p>
        </div>
        <div className="text-body-small text-gray-700 flex justify-between py-3 border-b border-gray-100">
          <p>Shipping:</p>
          <p className="text-black">Free</p>
        </div>
        <div className="text-body-small text-gray-700 flex justify-between py-3 border-b border-gray-100">
          <p>Discount:</p>
          <p className="text-black">0%</p>
        </div>
        <div className="text-body-small text-gray-700 flex justify-between py-3">
          <p>Total:</p>
          <p className="text-black font-semibold">
            $
            {currencyFormated(
              myData?.reduce(
                (total: number, item: { price: number; quantity: number }) =>
                  item.price * item.quantity + total,
                0
              )
            )}
          </p>
        </div>
        <Button className="w-full py-4 mt-5">Proceed to checkout</Button>
      </div>
    </div>
  );
};

export default MyCart;
