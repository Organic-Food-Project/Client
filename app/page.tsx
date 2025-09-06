import Image from 'next/image';
import HeroBG from '@/assets/HeroBG.png';
import Hero1 from '@/assets/Hero1.svg';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="z-1 relative bg-green-50 h-[640px]">
      <Image
        src={HeroBG}
        width={1920}
        height={640}
        alt="Hero background"
        className="absolute top-0 left-0 w-full h-full z-[-1]"
      />
      <div className="w-full h-full flex justify-center items-center py-[70px]">
        <button className="size-45px] bg-white rounded-full border border-gray-200 p-3">
          <ArrowLeft />
        </button>
        <div className="flex gap-[43px]">
          <Image src={Hero1} width={742} height={498} alt="Hero 1" />
          <div className="max-w-[596px] self-end">
            <p className="font-poppins text-primary pb-2">Welcome to shopery</p>
            <h2 className="text-display-01 font-poppins font-bold  pb-[28px]">
              Fresh & Healthy Organic Food
            </h2>
            <h3 className="text-heading-05 text-black/400">
              Sale up to <span className="text-warning font-bold">30% OFF</span>
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
        <button className="size-45px] bg-white rounded-full border border-gray-200 p-3">
          <ArrowRight />
        </button>
        <div className="absolute bottom-[24px] left-0 w-full flex items-center justify-center gap-2">
          <button className="size-[12px] rounded-full bg-green-200" />
          <button className="size-[12px] rounded-full bg-primary" />
          <button className="size-[12px] rounded-full bg-green-200" />
        </div>
      </div>
    </main>
  );
}
