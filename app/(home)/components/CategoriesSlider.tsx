'use client';
import type React from 'react';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Category from '@/components/Category';
import ButtonLeft from '@/components/ui/ButtonLeft';
import ButtonRight from '@/components/ui/ButtonRight';
import 'swiper/css';
import 'swiper/css/navigation';

interface CategoriesSliderProps {
  categories: {
    _id: string;
    name: string;
    products: string[];
    image: string;
  }[];
}

const CategoriesSlider: React.FC<CategoriesSliderProps> = ({ categories }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = () => {
    if (!swiperRef.current) return;
    setIsAtStart(swiperRef.current.isBeginning);
    setIsAtEnd(swiperRef.current.isEnd);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsAtStart(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };

  return (
    <div className="sliderPadding px-6 flex items-center gap-4 sm:gap-6 lg:gap-10">
      <ButtonLeft onClick={handlePrevClick} disabled={isAtStart} />

      <div className="flex-grow overflow-hidden">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          slidesPerView={6}
          spaceBetween={16}
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1380: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          loop={false}
          className="w-full"
          onInit={handleSwiperInit}
          onSlideChange={handleSlideChange}
        >
          {categories?.map(
            (el: {
              _id: string;
              name: string;
              products: string[];
              image: string;
            }) => (
              <SwiperSlide key={el?._id} className="h-auto flex-shrink-0">
                <Category
                  name={el?.name}
                  id={el?._id}
                  image={el?.image}
                  products={el?.products}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>

      <ButtonRight onClick={handleNextClick} disabled={isAtEnd} />
    </div>
  );
};

export default CategoriesSlider;
