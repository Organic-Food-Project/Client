import type React from 'react';

const ProductInfoSkeleton: React.FC = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-[24px]">
        {/* Image Gallery Skeleton */}
        <div className="flex max-md:flex-col-reverse items-center gap-4">
          {/* Thumbnail Skeletons */}
          <div className="flex md:flex-col gap-3">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
          {/* Main Image Skeleton */}
          <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg flex-grow" />
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Title and Badge Skeleton */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full" />
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <div className="h-[21px] w-32 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>

            {/* Price Skeleton */}
            <div className="border-b border-gray-100 pb-4">
              <div className="h-9 w-24 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Description Section Skeleton */}
          <div className="space-y-4 border-b border-gray-100 pb-4">
            {/* Brand and Share Skeleton */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-[21px] w-12 bg-gray-200 animate-pulse rounded" />
                <div className="w-14 h-14 bg-gray-200 animate-pulse rounded" />
              </div>

              {/* Social Icons Skeleton */}
              <div className="flex gap-4 items-center">
                <div className="h-[26px] w-20 bg-gray-200 animate-pulse rounded" />
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="w-[26px] h-[26px] bg-gray-200 animate-pulse rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Description Text Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Quantity & Buttons Skeleton */}
          <div className="flex gap-3 border-b border-gray-100 pb-4">
            {/* Quantity Selector Skeleton */}
            <div className="flex items-center border border-gray-100 px-2 rounded-full min-w-[140px]">
              <div className="rounded-full size-[34px] bg-gray-200 animate-pulse" />
              <div className="flex-grow flex justify-center">
                <div className="h-6 w-8 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="rounded-full size-[34px] bg-gray-200 animate-pulse" />
            </div>

            {/* Add to Cart Button Skeleton */}
            <div className="flex-1 h-12 bg-gray-200 animate-pulse rounded-lg" />

            {/* Wishlist Button Skeleton */}
            <div className="rounded-full h-12 w-12 bg-gray-200 animate-pulse" />
          </div>

          {/* Category Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;
