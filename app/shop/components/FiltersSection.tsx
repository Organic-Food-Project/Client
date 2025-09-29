'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { currencyFormated } from '@/lib/utils';

const FiltersSection = ({
  categories,
}: {
  categories: { name: string; id: string; count: number }[];
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
  });

  const [priceRange, setPriceRange] = useState([50, 1500]);
  const [selectedCategories, setSelectedCategories] = useState(['Vegetables']);
  const [selectedRatings, setSelectedRatings] = useState(['4.0 & up']);

  const ratings = [
    { label: '5.0', value: '5.0' },
    { label: '4.0 & up', value: '4.0 & up' },
    { label: '3.0 & up', value: '3.0 & up' },
    { label: '2.0 & up', value: '2.0 & up' },
    { label: '1.0 & up', value: '1.0 & up' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        <Star
          className={`size-[14px] ${
            i < rating
              ? 'text-warning fill-warning'
              : 'text-gray-200 fill-gray-200'
          }`}
        />
      </span>
    ));
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
            {categories.map((category) => (
              <div key={category.name} className="flex items-center space-x-3">
                <Checkbox
                  id={category.name}
                  checked={selectedCategories.includes(category.name)}
                  checkBoxType="circle"
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([
                        ...selectedCategories,
                        category.name,
                      ]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category.name)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={category.name}
                  className=" text-body-small cursor-pointer flex-1"
                >
                  {category.name}{' '}
                  <span className="text-gray-500">({category.count})</span>
                </label>
              </div>
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
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1500}
              min={50}
              step={10}
              className="w-full"
            />
            <div className="text-body-small text-gray-700">
              Price:{' '}
              <span className="text-gray-900 font-semibold">
                {currencyFormated(priceRange[0])} —{' '}
                {currencyFormated(priceRange[1])}
              </span>
            </div>
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
            {ratings.map((rating, index) => (
              <div key={rating.value} className="flex items-center space-x-3">
                <Checkbox
                  id={rating.value}
                  checked={selectedRatings.includes(rating.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedRatings([...selectedRatings, rating.value]);
                    } else {
                      setSelectedRatings(
                        selectedRatings.filter((r) => r !== rating.value)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={rating.value}
                  className="text-sm text-gray-700 cursor-pointer flex items-center space-x-2"
                >
                  <div className="flex">{renderStars(5 - index)}</div>
                  <span>{rating.label}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersSection;
