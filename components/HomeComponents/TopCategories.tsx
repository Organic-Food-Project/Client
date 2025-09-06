import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Category from '../Category';
import Leaf from '@/assets/icons/Leaf.svg';
import Image from 'next/image';

const TopCategories = () => {
  return (
    <div className=" bg-gradient-to-b from-green-50 to-white py-[80px]">
      <Image
        src={Leaf}
        width={41}
        height={107}
        alt="Leaf"
        className="absolute top-0 translate-y-[-50%] left-[10vw] rotate-[33deg]"
      />
      <div className="mainPadding flex justify-between items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03 font-poppins font-bold">
          Shop by Top Categories
        </h2>{' '}
        <Link
          href="/shop"
          className="font-poppins text-primary pb-2 flex gap-2"
        >
          View All
          <ArrowRight />
        </Link>
      </div>
      <div className="sliderPadding px-6 flex items-center gap-10">
        <button className="bg-white rounded-full border border-gray-200 p-3 h-fit">
          <ArrowLeft />
        </button>
        <div className="grid grid-cols-6 gap-6 flex-grow">
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
        <button className="bg-white rounded-full border border-gray-200 p-3 h-fit">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TopCategories;
