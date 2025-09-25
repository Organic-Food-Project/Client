'use client';
import TempProduct from '@/assets/TempProduct.webp';
import { Eye, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Cart from '@/assets/icons/Cart.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface ProductCardProps {
  isOutOfStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ isOutOfStock = false }) => {
  const [isHoverd, setIsHoverd] = useState(false);
  const ProductData = {
    imgSrc: TempProduct,
    imgAlt: 'product',
    title: 'Chanise Cabbage',
    price: 14.99,
    rating: 3.5,
  };
  return (
    <motion.div
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
      className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white"
    >
      <Link href="/shop/1">
        <Image
          src={ProductData.imgSrc}
          width={302}
          height={302}
          alt={ProductData.imgAlt}
          className="w-full"
        />
        {isOutOfStock && (
          <div className="absolute top-0 left-0 space-y-[6px] m-4 py-2 px-4 bg-black text-body-small text-white rounded-[4px]">
            Out of Stock
          </div>
        )}
        <div className="self-end flex justify-between items-center">
          <div className="space-y-2">
            <p className="text-gray-700 text-body-small">{ProductData.title}</p>
            <p className="text-body-medium font-semibold text-left">
              ${ProductData.price}
            </p>
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const normalizedRating = Math.max(
                  0,
                  Math.min(ProductData.rating, 5)
                );

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

export default ProductCard;
