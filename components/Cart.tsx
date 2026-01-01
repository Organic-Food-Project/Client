'use client';
import React, { useState, useTransition } from 'react';
import Cart from '@/assets/icons/Cart.svg';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { currencyFormated } from '@/lib/utils';
import { deleteFromCartAction } from '@/lib/actions/Cart';
import Toast from './ui/Toast';
import CustomLink from './CustomLink';

interface CartComponentProps {
  cart: {
    data: {
      data: {
        _id: string;
        name: string;
        price: number;
        images: string[];
        quantity: number;
      }[];
    };
    error: string | null;
  };
}

const CartComponent: React.FC<CartComponentProps> = ({ cart }) => {
  const [data, setData] = useState(cart?.data?.data ?? []);
  const [isPendingDelete, startDelete] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleShowNav = () => {
    setIsOpen((prev) => !prev);
  };

  const handleError = (
    errors: { form?: string } | null,
    actionName: string
  ) => {
    const errorMessage = errors?.form || `Failed to ${actionName}`;

    Toast({
      Message: errorMessage,
      type: 'error',
    });
  };

  const handleDeleteFromCart = (_id: string) => {
    startDelete(async () => {
      try {
        const res: {
          errors: { form: string } | null;
          success: boolean;
          status: number;
        } = await deleteFromCartAction({ _id });
        if (res.success) {
          Toast({
            Message: `Removed from cart successfully!`,
            type: 'success',
          });
          setData((prevData) => prevData.filter((item) => item._id !== _id));
        } else {
          handleError(res.errors, 'removed from cart');
        }
      } catch (error) {
        handleError(
          { form: 'An unexpected error occurred' },
          'removed from cart'
        );
        console.error('Cart error:', error);
      }
    });
  };

  return (
    <>
      <button
        aria-label="Cart"
        onClick={handleShowNav}
        className="cursor-pointer"
      >
        {data?.length > 0 && (
          <div className="absolute top-[-5px] right-[-5px] text-white bg-hard-primary flex justify-center items-center rounded-full size-[20px] text-[10px]" />
        )}
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
                <p className="text-body-xl font-semibold ">
                  Shopping Card ({data?.length})
                </p>
                <button
                  className="cursor-pointer"
                  aria-label="Exit"
                  onClick={handleShowNav}
                >
                  <X />
                </button>
              </div>
              <div className="space-y-[24px] px-[20px] w-full overflow-y-auto flex-grow">
                {data?.map((el, idx) => (
                  <ItemCard
                    key={el?._id}
                    idx={idx}
                    data={el}
                    count={data?.length}
                    handleDelete={handleDeleteFromCart}
                    isPendingDelete={isPendingDelete}
                  />
                ))}
              </div>
              <div className="w-full px-[40px] py-[40px]">
                <div className="flex items-center justify-between text-body-medium pb-[24px]">
                  <p>{data?.length} Product</p>
                  <p className="font-bold">
                    {currencyFormated(
                      data?.reduce((total, item) => total + item?.price, 0)
                    )}
                  </p>
                </div>
                <div className="space-y-[12px]">
                  <button className="cursor-pointer w-full text-center text-body-medium font-semibold bg-primary text-white rounded-full py-3">
                    Checkout
                  </button>
                  <CustomLink
                    onClick={handleShowNav}
                    href="/cart"
                    className="block w-full text-center text-body-medium font-semibold bg-[#56AC59]/10 text-primary rounded-full py-3"
                  >
                    Go To Cart
                  </CustomLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const ItemCard: React.FC<{
  idx: number;
  count: number;
  handleDelete: (_id: string) => void;
  isPendingDelete: boolean;
  data: CartComponentProps['cart']['data']['data'][number];
}> = ({ idx, count, handleDelete, isPendingDelete, data }) => {
  const ProductData = {
    id: data?._id,
    imgSrc: data?.images[0],
    imgAlt: data?.name,
    title: data?.name,
    price: data?.price,
    quantity: data?.quantity,
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
        <p>{ProductData?.title}</p>
        <p>
          {ProductData?.quantity} x{' '}
          <span className="font-bold">
            {currencyFormated(ProductData?.price)}
          </span>
        </p>
      </div>
      <div>
        <button
          onClick={() => handleDelete(ProductData?.id)}
          disabled={isPendingDelete}
          aria-label="Delete"
          className="cursor-pointer rounded-full border border-gray-20 size-[32px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="group-hover:text-white duration-100" />
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
