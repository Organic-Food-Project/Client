'use client';
import TempProduct from '@/assets/TempProduct.png';
import React, { useState } from 'react';
import Cart from '@/assets/icons/Cart.svg';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

const CartComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleShowNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <button onClick={handleShowNav} className="cursor-pointer">
        <div className="absolute top-[-5px] right-[-5px] text-white bg-hard-primary flex justify-center items-center rounded-full size-[20px] text-[10px]" />
        <Image src={Cart} alt="Cart" width={32} height={32} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleShowNav}
              className="z-[49] fixed top-0 right-0 w-full h-screen bg-black/80 flex flex-col justify-center items-center"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.2 }}
              className="z-[50] fixed top-0 right-0 w-[456px] h-screen bg-white flex flex-col justify-between items-center"
            >
              <div className="space-y-[12px] px-[40px] pt-[40px] w-full flex items-center justify-between">
                <p className="text-body-xl font-semibold ">Shopping Card (2)</p>
                <button onClick={handleShowNav}>
                  <X />
                </button>
              </div>
              <div className="space-y-[24px] px-[20px] w-full overflow-y-auto flex-grow">
                {[1, 2].map((el, idx) => (
                  <ItemCard key={el} idx={idx} count={2} />
                ))}
              </div>
              <div className="w-full px-[40px] py-[40px]">
                <div className="flex items-center justify-between text-body-medium pb-[24px]">
                  <p>2 Product</p>
                  <p className="font-bold">$26.00</p>
                </div>
                <div className="space-y-[12px]">
                  <button className="cursor-pointer w-full text-center text-body-medium font-semibold bg-primary text-white rounded-full py-3">
                    Checkout
                  </button>
                  <Link
                    onClick={handleShowNav}
                    href="/cart"
                    className="block w-full text-center text-body-medium font-semibold bg-[#56AC59]/10 text-primary rounded-full py-3"
                  >
                    Go To Cart
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const ItemCard: React.FC<{ idx: number; count: number }> = ({ idx, count }) => {
  const ProductData = {
    imgSrc: TempProduct,
    imgAlt: 'product',
    title: 'Chanise Cabbage',
    price: 14.99,
    rating: 3.5,
  };
  return (
    <div
      className={`flex items-center gap-2 ${
        idx !== count - 1 && 'border-b border-gray-200'
      }`}
    >
      <Image
        src={ProductData.imgSrc}
        width={120}
        height={100}
        alt={ProductData.imgAlt}
      />
      <div className="flex-grow text-body-small">
        <p>Fresh Indian Orange</p>
        <p>
          1 kg x <span className="font-bold">12.00</span>
        </p>
      </div>
      <div>
        <button className="cursor-pointer border border-gray-200 rounded-full p-2 hover:bg-danger group duration-100">
          <X className="group-hover:text-white duration-100" />
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
