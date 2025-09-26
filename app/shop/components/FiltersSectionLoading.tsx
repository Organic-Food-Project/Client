'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

const FiltersSectionLoading = () => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-white h-fit space-y-6">
      {/* Filter Button Section */}
      <button className="w-fit flex items-center justify-center gap-4 font-bold text-body-medium font-semibold bg-primary text-white rounded-full px-7 h-[45px]">
        Filter
        <SlidersHorizontal size={24} />
      </button>

      {/* Categories Section */}
      <div className="">
        <button
          onClick={() => toggleSection('categories')}
          className="cursor-pointer flex items-center justify-between w-full font-semibold  text-gray-900 text-body-xl mb-4"
        >
          All Categories
          {expandedSections.categories ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4, 5].map((el) => (
              <div
                key={el}
                style={{
                  width: `${Math.random() * 50 + 50}%`,
                }}
                className="w-full h-[21px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="border-y border-gray-100 py-4">
        <button
          onClick={() => toggleSection('price')}
          className="cursor-pointer flex items-center justify-between w-full font-semibold  text-gray-900 text-body-xl mb-4"
        >
          Price
          {expandedSections.price ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div className="w-full h-[21px] bg-gray-100 animate-pulse" />
          </div>
        )}
      </div>

      {/* Rating Section */}
      <div className="">
        <button
          onClick={() => toggleSection('rating')}
          className="cursor-pointer flex items-center justify-between w-full font-semibold  text-gray-900 text-body-xl mb-4"
        >
          Rating
          {expandedSections.rating ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((el) => (
              <div
                key={el}
                style={{
                  width: `${Math.random() * 50 + 50}%`,
                }}
                className="w-full h-[21px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersSectionLoading;
