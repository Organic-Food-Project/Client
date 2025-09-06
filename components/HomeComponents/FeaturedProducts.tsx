import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ProductCard from '../ProductCard';

const FeaturedProducts = () => {
  return (
    <>
      <div className="flex justify-between items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03 font-poppins font-bold">
          Featured Products
        </h2>{' '}
        <Link
          href="/shop"
          className="font-poppins text-primary pb-2 flex gap-2"
        >
          View All
          <ArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};

export default FeaturedProducts;
