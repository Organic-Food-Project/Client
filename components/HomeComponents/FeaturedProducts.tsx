import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ProductCard from '../ProductCard';
import Vig1 from '@/assets/Vig1.svg';
import Image from 'next/image';

const FeaturedProducts = () => {
  return (
    <div className="mainPadding">
      <div className="flex justify-between items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03  font-bold">
          Featured Products
        </h2>{' '}
        <Link href="/shop" className=" text-primary pb-2 flex gap-2">
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
      <Image
        src={Vig1}
        width={144}
        height={434}
        alt="Vig1"
        className="absolute bottom-0 left-0 z-[-1]"
      />
    </div>
  );
};

export default FeaturedProducts;
