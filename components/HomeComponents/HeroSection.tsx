import Image from 'next/image';
import HeroBG from '@/assets/HeroBG.png';
import Hero1 from '@/assets/Hero1.svg';
import Leaf from '@/assets/icons/Leaf.svg';
import IconFrame from '@/assets/icons/IconFrame.svg';
import IconFrameSelected from '@/assets/icons/IconFrameSelected.svg';
import Delivery from '@/assets/icons/delivery.svg';
import CustomerSupport from '@/assets/icons/customer-support.svg';
import ShoppingBag from '@/assets/icons/shopping-bag.svg';
import Package from '@/assets/icons/package.svg';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ButtonLeft from '../ui/ButtonLeft';
import ButtonRight from '../ui/ButtonRight';

const HeroSection = () => {
  const Cards = [
    {
      title: 'Free Shipping',
      description: 'Free shipping with discount',
      image: Delivery,
      frame: IconFrame,
    },
    {
      title: 'Great Support 24/7',
      description: 'Instant access to Contact',
      image: CustomerSupport,
      frame: IconFrame,
    },
    {
      title: '100% Sucure Payment',
      description: 'We ensure your money is save',
      image: ShoppingBag,
      frame: IconFrameSelected,
    },
    {
      title: 'Money-Back Guarantee',
      description: '30 days money-back',
      image: Package,
      frame: IconFrame,
    },
  ];
  return (
    <>
      <section className="z-1 relative bg-green-50 xl:h-[640px]">
        <Image
          src={HeroBG}
          width={1920}
          height={498}
          alt="Hero background"
          className="absolute top-0 left-0 w-full h-full z-[-1] object-cover"
        />
        <div className="w-full h-full flex justify-center items-center py-[70px] px-6 gap-5">
          <ButtonLeft className="max-md:hidden" />
          <div className="xl:flex gap-[43px]">
            <Image src={Hero1} width={742} height={498} alt="Hero 1" />
            <div className="max-w-[596px] self-end">
              <p className=" text-primary pb-2">Welcome to shopery</p>
              <h1 className="text-4xl sm:text-display-03 md:text-display-01  font-bold  pb-[28px]">
                Fresh & Healthy Organic Food
              </h1>
              <h3 className="text-heading-05 text-black/400">
                Sale up to{' '}
                <span className="text-warning font-bold">30% OFF</span>
              </h3>
              <p className="pb-[32px] text-gray-500 text-body-small">
                Free shipping on all your order. we deliver, you enjoy
              </p>
              <Link
                href="/shop"
                aria-label="Shop now"
                className="w-fit flex items-center justify-center gap-4 font-bold text-body-medium font-semibold bg-primary text-white rounded-full px-10 py-4"
              >
                Shop now
                <ArrowRight />
              </Link>
            </div>
          </div>
          <ButtonRight className="max-md:hidden" />
          <div className="absolute bottom-[24px] left-0 w-full flex items-center justify-center gap-2">
            <button className="size-[12px] rounded-full bg-green-200" />
            <button className="size-[12px] rounded-full bg-primary" />
            <button className="size-[12px] rounded-full bg-green-200" />
          </div>
        </div>
        <Image
          src={Leaf}
          width={41}
          height={107}
          alt="Leaf"
          className="absolute bottom-0 translate-y-[50%] right-[10vw] rotate-[-33deg]"
        />
      </section>
      <section className="mainPadding">
        <div className="border-b border-[#CCCCCC] grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-x-[24px]">
          {Cards.map((el, idx) => (
            <div
              key={idx}
              className="h-[200px] md:h-[244px] flex items-center justify-center gap-4 flex-col hover:border-b-[5px] hover:border-primary transition-all duration-100 cursor-pointer"
            >
              <div className="relative size-[72px] z-1 flex justify-center items-center">
                <Image
                  src={el.frame}
                  width={72}
                  height={72}
                  alt="Icon Frame"
                  className="absolute top-0 left-0 z-[-1]"
                />
                <Image src={el.image} width={36} height={36} alt={el.title} />
              </div>
              <div className="text-center space-y-2">
                <h2 className="font-bold text-body-large">{el.title}</h2>
                <p className="text-gray-400 text-body-small">
                  {el.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
