'use client';
import TempProduct from '@/assets/TempProduct.webp';
import { Eye, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Cart from '@/assets/icons/Cart.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

interface ProductProps {
  img?: string;
  description: string;
  name: string;
  price: number;
  rate: number;
  quantity: number;
}

const Product: React.FC<ProductProps> = ({
  img = TempProduct,
  description = 'product',
  name,
  price,
  rate,
  quantity = 0,
}) => {
  const [isHoverd, setIsHoverd] = useState(false);
  const isOutOfStock = quantity === 0;
  return (
    <motion.div
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
      className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white"
    >
      <Link href={`/shop/${slugify(name)}`}>
        <Image
          src={img}
          width={302}
          height={302}
          alt={description}
          className="w-full"
        />
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
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const normalizedRating = Math.max(0, Math.min(rate, 5));

                if (normalizedRating >= starValue) {
                  return (
                    <Star
                      key={i}
                      className="w-5 h-5 text-warning fill-warning"
                    />
                  );
                } else if (normalizedRating >= starValue - 0.5) {
                  return (
                    <div key={i} className="relative w-5 h-5">
                      <Star className="absolute w-5 h-5 text-warning fill-warning clip-half" />
                      <Star className="absolute w-5 h-5 text-gray-300" />
                    </div>
                  );
                } else {
                  return <Star key={i} className="w-5 h-5 text-gray-200" />;
                }
              })}
            </div>
          </div>
          <button
            aria-label="Add to Cart"
            disabled={isOutOfStock}
            className="disabled:cursor-not-allowed cursor-pointer size-[40px] bg-gray-50 rounded-full flex justify-center items-center"
          >
            <Image src={Cart} width={20} height={20} alt="Add to Cart" />
          </button>
        </div>
        <AnimatePresence>
          {isHoverd && (
            <div className="absolute top-0 right-0 space-y-[6px] p-4">
              <motion.button
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(1);
                }}
                className="cursor-pointer flex items-center justify-center size-[40px] bg-white border border-gray-50 rounded-full"
              >
                <Heart size={20} />
              </motion.button>
              <motion.button
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(1);
                }}
                className="cursor-pointer flex items-center justify-center size-[40px] bg-white border border-gray-50 rounded-full"
              >
                <Eye size={20} />
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
};

export const LoadingProduct = () => {
  return (
    <div className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white">
      <Link href="/shop">
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
      </Link>
    </div>
  );
};

export default Product;
