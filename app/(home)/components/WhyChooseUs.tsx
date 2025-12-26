import Image from 'next/image';
import React, { Suspense } from 'react';
import WhyUs from '@/assets/WhyUS.webp';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Leaf from '@/assets/icons/Leaf.svg';
import Leaf2 from '@/assets/icons/Leaf2.svg';
import StaticsBG from '@/assets/StaticsBG.webp';
import VigBG from '@/assets/VigBG.webp';
import StaticsCard from '@/components/StaticsCard';
import Query from '@/lib/Query';
const WhyChooseUs = () => {
  const Statics = [
    {
      title: 37,
      description: 'Years of Hard Work',
    },
    {
      title: 500,
      description: 'Happy Customer',
    },
    {
      title: 28,
      description: 'Qualified Team Member',
    },
    {
      title: 750,
      description: 'Total Orders',
    },
  ];
  const CheckBox = () => {
    return (
      <div className="flex gap-2 bg-primary rounded-full w-fit p-1">
        <Check color="white" size={20} />
      </div>
    );
  };
  return (
    <>
      <div className="z-1 relative flex max-xl:flex-col justify-center items-center gap-10  mainPadding pt-[24px] pb-[80px]">
        <Image src={WhyUs} alt="Why choose us" className="xl:w-1/2" />
        <div className="xl:w-1/2 xl:self-end space-y-[26px]">
          <h2 className="max-w-[389px] text-3xl sm:text-heading-03  font-bold">
            100% Trusted Organic Food Store
          </h2>
          <div className="space-y-[10px]">
            <h3 className="text-body-large font-semibold text-black/400 flex items-center gap-3">
              <CheckBox />
              Healthy & natural food for lovers of healthy food.
            </h3>
            <p className="pl-[34px] text-gray-500 text-body-small">
              Ut quis tempus erat. Phasellus euismod bibendum magna non
              tristique. Pellentesque semper vestibulum elit sed condimentum.
              Nunc pretium fermentum interdum.{' '}
            </p>
          </div>
          <div className="space-y-[10px]">
            <h3 className="text-body-large font-semibold text-black/400 flex items-center gap-3">
              <CheckBox />
              Every day fresh and quality products for you.
            </h3>
            <p className="pl-[34px] text-gray-500 text-body-small">
              Maecenas vehicula a justo quis laoreet. Sed in placerat nibh, a
              posuere ex. Morbi sem neque, aliquam sed orci et, rhoncus lobortis
              felis. Sed vestibulum nisl sit amet sapien.
            </p>
          </div>
          <Link
            href="/shop"
            aria-label="Shop now"
            className="w-fit flex items-center justify-center gap-4 text-body-medium font-semibold bg-primary text-white rounded-full px-10 py-4"
          >
            Shop now
            <ArrowRight />
          </Link>
        </div>
        <Image
          src={Leaf}
          width={41}
          height={107}
          alt="Leaf"
          className="absolute top-0 translate-y-[50%] right-[10vw] rotate-[-33deg]"
        />
        <Image
          src={VigBG}
          width={1920}
          height={617}
          alt="Leaf"
          className="absolute top-0 left-0 w-full h-full z-[-1]"
        />
      </div>
      <div className="mainPadding z-1 relative min-h-[331px] flex py-[80px]">
        <Image
          src={Leaf2}
          width={56}
          alt="Leaf"
          className="z-[-1] absolute top-0 translate-y-[-65%]  right-[10vw] rotate-[25deg]"
        />
        <Image
          src={StaticsBG}
          width={1920}
          height={331}
          className="z-[-1] w-full h-full absolute top-0 left-0 max-lg:object-cover"
          alt="Statics BG"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow w-full ">
          <Suspense fallback={<AllStaticsLoading />}>
            <AllStatics />
          </Suspense>
        </div>
      </div>
    </>
  );
};

const AllStatics = async () => {
  const Analytics = await Query({
    api: 'v1/analytics',
  });
  const Statics = [
    {
      title: Analytics?.data?.Years,
      suffix: '+',
      description: 'Years of Hard Work',
    },
    {
      title: Analytics?.data?.Happy_Customers,
      description: 'Happy Customer',
    },
    {
      title: Analytics?.data?.Qualified_Team_Member,
      description: 'Qualified Team Member',
    },
    {
      title: Analytics?.data?.Total_Orders,
      description: 'Total Orders',
    },
  ];
  return Statics.map((item, index) => (
    <StaticsCard
      key={index}
      title={item.title}
      suffix={item.suffix}
      description={item.description}
    />
  ));
};

const AllStaticsLoading = () => {
  const Statics = [
    {
      title: 1,
      suffix: '+',
      description: 'Years of Hard Work',
    },
    {
      title: 1,
      description: 'Happy Customer',
    },
    {
      title: 1,
      description: 'Qualified Team Member',
    },
    {
      title: 1,
      description: 'Total Orders',
    },
  ];
  return Statics.map((item, index) => (
    <StaticsCard
      loading={true}
      key={index}
      title={item.title}
      suffix={item.suffix}
      description={item.description}
    />
  ));
};

export default WhyChooseUs;
