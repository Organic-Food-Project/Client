import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Page404Image from '@/assets/Illustration/Page404.svg';

const NotFound = () => {
  return (
    <div className="mainPadding text-center flex flex-col justify-center items-center py-20">
      <Image
        src={Page404Image}
        alt="404 Page Navigate to Home"
        width={582}
        height={354}
      />
      <h3 className="text-heading-03 font-600 text-gray-900 pt-8">
        Oops! page not found
      </h3>
      <p className="text-body-medium font-400 text-gray-500 max-w-[600px] py-5">
        This is 404 page please navigate to home and explore our best organic
        and healty food in Ecobazar.
      </p>
      <Link
        href="/"
        className="rounded-full bg-primary text-body-small font-600 text-white py-4 px-7"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
