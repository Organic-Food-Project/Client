'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Minus, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Facebook from '@/assets/icons/Facebook.svg';
import Instagram from '@/assets/icons/Instagram.svg';
import Twitter from '@/assets/icons/Twitter.svg';
import Patreon from '@/assets/icons/Patreon.svg';
import Brand from '@/assets/icons/Brand.svg';
import type { ProductData } from '@/types/global';
import Rating from '@/components/Rating';
import CustomLink from './CustomLink';

interface ProductInfoProps {
  isWishlisted: boolean;
  handleAddToCart: (_id: string, quantity: number) => void;
  isPendingAddToCart: boolean;
  isPendingAddToWishlist: boolean;
  handleAddToWishlist: (_id: string) => void;
  productData: ProductData;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  isWishlisted,
  isPendingAddToCart,
  isPendingAddToWishlist,
  handleAddToWishlist,
  handleAddToCart,
  productData,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const inStock = productData.quantity !== 0;

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < productData.quantity) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-[24px]">
        {/* Image Gallery */}
        <div className="flex max-md:flex-col-reverse items-center gap-4">
          <div className="flex md:flex-col gap-3">
            {productData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`cursor-pointer relative size-15 sm:size-20 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? 'border-2 border-primary'
                    : 'hover:border-primary/50'
                }`}
              >
                <Image
                  src={image || '/placeholder.svg'}
                  width={80}
                  height={80}
                  alt={`${productData.name} view ${index + 1}`}
                  className="aspect-square"
                />
              </button>
            ))}
          </div>
          <Image
            src={productData.images[selectedImage] || '/placeholder.svg'}
            alt={productData.name}
            width={556}
            height={556}
            className="aspect-square flex-grow"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          {/* Pricing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h1 className="text-4xl font-bold text-foreground">
                {productData.name}
              </h1>
              {inStock ? (
                <Badge variant="inStock">In Stock</Badge>
              ) : (
                <Badge variant="outOfStock">Out of Stock</Badge>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 text-body-small mb-4">
              <div className="flex items-center gap-1">
                <Rating rate={productData.rate.avg} />
                <span className="">
                  {productData.rate.number_of_rates} Review
                  {productData.rate.number_of_rates > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            {/* Pricing */}
            <div className="text-body-xxl font-medium text-hard-primary border-b border-gray-100 pb-4">
              ${productData.price.toFixed(2)}
            </div>
          </div>
          {/* Description */}
          <div className="space-y-4 border-b border-gray-100 pb-4">
            {/* Brand */}
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center gap-3 aligncenter">
                <span className="text-body-small ">Brand:</span>
                <Image
                  src={Brand || '/placeholder.svg'}
                  alt="Brand"
                  width={56}
                  height={56}
                  className="aspect-square"
                />
              </div>

              {/* Share Item */}
              <div className="flex gap-4 flex-grow sm2:flex-grow-0 justify-center">
                <span className="text-body-small ">Share item:</span>
                <CustomLink href="https://web.facebook.com/" target="_blank">
                  <Image
                    src={Facebook || '/placeholder.svg'}
                    alt="Facebook"
                    width={26}
                    height={26}
                    className="rounded-full bg-primary p-1 min-w-[26px] aspect-square"
                  />
                </CustomLink>
                <CustomLink href="https://twitter.com/" target="_blank">
                  <Image
                    src={Twitter || '/placeholder.svg'}
                    alt="Twitter"
                    width={26}
                    height={26}
                    className="min-w-[26px] aspect-square"
                  />
                </CustomLink>
                <CustomLink href="https://www.patreon.com/" target="_blank">
                  <Image
                    src={Patreon || '/placeholder.svg'}
                    alt="Patreon"
                    width={26}
                    height={26}
                    className="min-w-[26px] aspect-square"
                  />
                </CustomLink>
                <CustomLink href="https://www.instagram.com/" target="_blank">
                  <Image
                    src={Instagram || '/placeholder.svg'}
                    alt="Instagram"
                    width={26}
                    height={26}
                    className="min-w-[26px] aspect-square"
                  />
                </CustomLink>
              </div>
            </div>

            {/* Description */}
            <p className="text-body-small leading-relaxed text-gray-500 overflow-y-auto max-h-[200px]">
              {productData.description}
            </p>
          </div>
          {/* Quantity & Add to Cart */}
          <div className="flex gap-3 border-b border-gray-100 pb-4">
            <div className="flex items-center border border-gray-100 px-2 rounded-full min-w-[140px]">
              <Button
                onClick={decreaseQuantity}
                disabled={quantity === 1 || isPendingAddToCart}
                className={`rounded-full size-[34px] bg-gray-50 text-black transition-opacity ${
                  quantity === 1 || isPendingAddToCart
                    ? 'opacity-30 cursor-not-allowed'
                    : ''
                }`}
              >
                <Minus className="size-[16px]" />
              </Button>
              <span className="flex-grow text-center text-body-medium">
                {quantity}
              </span>
              <Button
                onClick={increaseQuantity}
                disabled={
                  quantity >= productData.quantity || isPendingAddToCart
                }
                className={`rounded-full size-[34px] bg-gray-50 text-black transition-opacity ${
                  quantity >= productData.quantity || isPendingAddToCart
                    ? 'opacity-30 cursor-not-allowed'
                    : ''
                }`}
              >
                <Plus className="size-[16px]" />
              </Button>
            </div>

            <Button
              disabled={!inStock || isPendingAddToCart}
              onClick={() => handleAddToCart(productData._id, quantity)}
              className="flex-1 h-12 bg-primary font-semibold"
            >
              {isPendingAddToCart ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : (
                'Add to Cart'
              )}
            </Button>

            <Button
              onClick={() => {
                handleAddToWishlist(productData._id);
              }}
              disabled={isPendingAddToWishlist}
              className={`rounded-full bg-hard-primary/10 text-hard-primary h-12 w-12 transition-opacity ${
                isWishlisted ? 'bg-red-50 border-red-200' : ''
              } ${
                isPendingAddToWishlist ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isPendingAddToWishlist ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              )}
            </Button>
          </div>

          {/* Category & Tags */}
          <div className="space-x-2 text-body-small font-semibold">
            <span className="text-gray-900">Category:</span>
            <span className="text-gray-500">{productData.category.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
