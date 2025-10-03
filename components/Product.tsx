'use client';
import { Eye, Heart, X } from 'lucide-react';
import Image from 'next/image';
import Cart from '@/assets/icons/Cart.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import Rating from './Rating';
import ProductInfo from './ProductInfo';

interface ProductProps {
  _id: string;
  images?: string[];
  description: string;
  name: string;
  price: number;
  rate: number;
  quantity: number;
  category: {
    name: string;
    _id: string;
  };
  feddBack: string[];
}

const Product: React.FC<ProductProps> = ({
  _id,
  images = ['/Logo.ico'],
  description = 'product',
  name,
  price,
  rate,
  quantity = 0,
  category,
  feddBack,
}) => {
  const [isHoverd, setIsHoverd] = useState(false);
  const [open, setOpen] = useState(false); // modal state
  const isOutOfStock = quantity === 0;

  return (
    <motion.div
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
      className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white"
    >
      {/* الصورة + اللينك */}
      <Link href={`/shop/${slugify(name)}`}>
        <Image
          src={images[0]}
          width={302}
          height={302}
          alt={description}
          className="w-full aspect-square"
        />
      </Link>

      {/* لو المنتج خلص */}
      {isOutOfStock && (
        <div className="absolute top-0 left-0 space-y-[6px] m-4 py-2 px-4 bg-black text-body-small text-white rounded-[4px]">
          Out of Stock
        </div>
      )}

      {/* الاسم + السعر + الريتنغ */}
      <div className="self-end flex justify-between items-center mt-4">
        <div className="space-y-2 flex-grow">
          <p className="text-gray-700 text-body-small line-clamp-1 text-left">
            {name}
          </p>
          <p className="text-body-medium font-semibold text-left">${price}</p>
          <div className="flex">
            <Rating rate={rate} />
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

      {/* الأزرار اللي بتظهر في الهوفر */}
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
                console.log('❤️ clicked');
              }}
              className="cursor-pointer flex items-center justify-center size-[40px] bg-white border border-gray-50 rounded-full"
            >
              <Heart size={20} />
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pt-[86px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)} // يقفل عند الكليك بره
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white p-6 rounded-lg text-left w-[70vw] overflow-auto relative"
              onClick={(e) => e.stopPropagation()} // مايقفلش لو ضغطت جوه
            >
              <ProductInfo
                productData={{
                  _id,
                  images,
                  description,
                  name,
                  price,
                  rate,
                  quantity,
                  category,
                  feddBack,
                }}
              />
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer m-5 p-1 text-hard-primary bg-white rounded-full aspect-square absolute top-0 left-0 border"
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
