import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { LoadingCategory } from '@/components/Category';
import Leaf from '@/assets/icons/Leaf.svg';
import Image from 'next/image';
import ButtonLeft from '@/components/ui/ButtonLeft';
import ButtonRight from '@/components/ui/ButtonRight';
import { Suspense } from 'react';
import Query from '@/lib/Query';
import CategoriesSlider from './CategoriesSlider';

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
        <h2 className="text-4xl sm:text-heading-03  font-bold">
          Shop by Top Categories
        </h2>{' '}
        <Link href="/shop" className=" text-primary pb-2 flex gap-2">
          View All
          <ArrowRight />
        </Link>
      </div>
      <Suspense fallback={<CategoriesLoading />}>
        <AllCategories />
      </Suspense>
    </div>
  );
};

const AllCategories = async () => {
  const categories = await Query({
    api: 'v1/categories?limit=200',
  });

  if (categories.error) {
    return categories.error;
  }

  return <CategoriesSlider categories={categories.data?.data} />;
};

const CategoriesLoading = () => {
  return (
    <div className="sliderPadding px-6 flex items-center gap-10">
      <ButtonLeft disabled={true} />
      <div className="grid grid-cols-6 gap-6 flex-grow">
        <LoadingCategory />
        <LoadingCategory />
        <LoadingCategory />
        <LoadingCategory />
        <LoadingCategory />
        <LoadingCategory />
      </div>
      <ButtonRight disabled={true} />
    </div>
  );
};
export default TopCategories;
