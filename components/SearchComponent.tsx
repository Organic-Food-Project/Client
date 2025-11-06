'use client';
import React from 'react';
import Search from '@/assets/icons/Search.svg';
import Image from 'next/image';

const SearchComponent = () => {
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        console.log(1);
      }}
    >
      <Image src={Search} alt="Search" width={32} height={32} />
    </button>
  );
};

export default SearchComponent;
