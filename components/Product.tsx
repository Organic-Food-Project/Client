'use client';
import { Eye, Heart, X, Loader2 } from 'lucide-react';
import type React from 'react';
import Image from 'next/image';
import { BackendImage } from '@/components/BackendImage';
import Cart from '@/assets/icons/Cart.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useTransition } from 'react';
import { slugify } from '@/lib/utils';
import Toast from './ui/Toast';
import Rating from './Rating';
import ProductInfo from './ProductInfo';
import { addToCartAction } from '@/lib/actions/Cart';
import {
  addToWishlistAction,
  deleteFromWishlistAction,
} from '@/lib/actions/Wishlist';
import { useRouter } from 'next/navigation';
import CustomLink from './CustomLink';

interface ProductProps {
  _id: string;
  images?: string[];
  description: string;
  name: string;
  price: number;
  rate: {
    avg: number;
    number_of_rates: number;
    total: number;
  };
  quantity: number;
  category: {
    name: string;
    _id: string;
  };
  feedBack: string[];
  inWishlist: boolean;
}

const Product: React.FC<ProductProps> = ({
  _id,
  images = [],
  description = 'product',
  name,
  price,
  rate,
  quantity = 0,
  inWishlist = false,
  category,
  feedBack,
}) => {
  const [isPendingAddToCart, startAddToCart] = useTransition();
  const [isPendingAddToWishlist, startAddToWishlist] = useTransition();
  const [isWishlisted, setIsWishlisted] = useState<boolean>(inWishlist);
  const [isHoverd, setIsHoverd] = useState(false);
  const [open, setOpen] = useState(false);
  const isOutOfStock = quantity === 0;
  const router = useRouter();

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

  const handleAddToWishlist = async (id: string) => {
    startAddToWishlist(async () => {
      try {
        const res: {
          errors: { form: string } | null;
          success: boolean;
          status: number;
        } = !isWishlisted
          ? await addToWishlistAction({ _id: id })
          : await deleteFromWishlistAction({ _id: id });
        if (res.status === 401) {
          router.push('/account/login');
        }
        if (res.success) {
          Toast({
            Message: !isWishlisted
              ? 'Added to wishlist!'
              : 'Removed from wishlist!',
            type: 'success',
          });
          setIsWishlisted((prev) => !prev);
        } else {
          handleError(
            res.errors,
            !isWishlisted ? 'add to wishlist' : 'remove from wishlist'
          );
        }
      } catch (error) {
        handleError(
          { form: 'An unexpected error occurred' },
          !isWishlisted ? 'add to wishlist' : 'remove from wishlist'
        );
        console.error('Wishlist error:', error);
      }
    });
  };

  const handleAddToCart = async (_id: string, quantity: number) => {
    startAddToCart(async () => {
      try {
        const res: {
          errors: { form: string } | null;
          success: boolean;
          status: number;
        } = await addToCartAction({ _id, quantity });
        if (res.status === 401) {
          router.push('/account/login');
        }
        if (res.success) {
          Toast({
            Message: `Added ${quantity} item(s) to cart!`,
            type: 'success',
          });
          router.push('/cart');
        } else {
          handleError(res.errors, 'add to cart');
        }
      } catch (error) {
        handleError({ form: 'An unexpected error occurred' }, 'add to cart');
        console.error('Cart error:', error);
      }
    });
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
      className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white"
    >
      <CustomLink href={`/shop/${slugify(name)}`}>
        <BackendImage
          src={images[0]}
          width={302}
          height={302}
          alt={description}
          className="w-full aspect-square object-cover"
        />
      </CustomLink>

      {isOutOfStock && (
        <div className="absolute top-0 left-0 space-y-[6px] m-4 py-2 px-4 bg-black text-body-small text-white rounded-[4px]">
          Out of Stock
        </div>
      )}

      <div className="self-end flex justify-between items-center mt-4">
        <div className="space-y-2 flex-grow">
          <p className="text-gray-700 text-body-small line-clamp-1 text-left">
            {name}
          </p>
          <p className="text-body-medium font-semibold text-left">${price}</p>
          <div className="flex">
            <Rating rate={rate.avg} />
          </div>
        </div>
        <button
          onClick={() => {
            handleAddToCart(_id, 1);
          }}
          aria-label="Add to Cart"
          disabled={isOutOfStock || isPendingAddToCart}
          className="disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer size-[40px] bg-gray-50 rounded-full flex justify-center items-center transition-opacity"
        >
          {isPendingAddToCart ? (
            <Loader2 width={20} height={20} className="animate-spin" />
          ) : (
            <Image
              src={Cart || '/placeholder.svg'}
              width={20}
              height={20}
              alt="Add to Cart"
            />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isHoverd && (
          <div className="absolute top-0 right-0 space-y-[6px] p-4">
            {/* زرار القلب */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => {
                e.preventDefault();
                handleAddToWishlist(_id);
              }}
              disabled={isPendingAddToWishlist}
              className={`cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center size-[40px] border border-gray-50 rounded-full transition-opacity ${
                isWishlisted ? 'bg-red-50 border-red-200' : 'bg-white'
              } ${
                isPendingAddToWishlist ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isPendingAddToWishlist ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              )}
            </motion.button>

            {/* زرار العين يفتح المودال */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="cursor-pointer flex items-center justify-center size-[40px] bg-white border border-gray-50 rounded-full"
            >
              <Eye size={20} />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* المودال */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 flex lg:items-center justify-center bg-black/50 py-5 z-[101]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className=" bg-white p-6 rounded-lg text-left w-[90%] lg:w-[70vw] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ProductInfo
                isWishlisted={isWishlisted}
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
                isPendingAddToCart={isPendingAddToCart}
                isPendingAddToWishlist={isPendingAddToWishlist}
                productData={{
                  _id,
                  images,
                  description,
                  name,
                  price,
                  rate,
                  quantity,
                  category,
                  feedBack,
                  inWishlist,
                }}
              />
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer m-5 p-2 text-hard-primary bg-white rounded-full aspect-square absolute top-[-70px] left-[-70px] border"
              >
                <X />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const LoadingProduct = () => {
  return (
    <div className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white">
      <CustomLink href="/shop?sort=-rate">
        <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-[8px]" />
        <div className="self-end flex justify-between items-center gap-2 mt-4">
          <div className="space-y-2 flex-grow">
            <span className="bg-gray-100 animate-pulse block w-2/3 h-[21px]" />
            <span className="bg-gray-100 animate-pulse block w-1/3 h-[24px]" />
            <span className="bg-gray-100 animate-pulse block w-1/2 h-[20px]" />
          </div>
          <button
            aria-label="Add to Cart"
            disabled={true}
            className="disabled:cursor-not-allowed size-[40px] bg-gray-100 animate-pulse rounded-full flex justify-center items-center"
          />
        </div>
      </CustomLink>
    </div>
  );
};

export default Product;
