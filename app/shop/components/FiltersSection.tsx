'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { currencyFormated } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FiltersSection = ({
  categories,
}: {
  categories: { name: string; id: string; count: number }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const ratings = [
    { label: '5.0', value: '5' },
    { label: '4.0 & up', value: '4' },
    { label: '3.0 & up', value: '3' },
    { label: '2.0 & up', value: '2' },
    { label: '1.0 & up', value: '1' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-[14px] ${
          i < rating
            ? 'text-warning fill-warning'
            : 'text-gray-200 fill-gray-200'
        }`}
      />
    ));

  const updateFiltersInUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const filterKeys = ['min_price', 'max_price', 'rate', 'category'];

    filterKeys.forEach((key) => {
      params.delete(`filter[${key}]`);
    });

    [
      { key: 'min_price', value: priceRange[0] },
      { key: 'max_price', value: priceRange[1] },
      { key: 'rate', value: selectedRating },
      ...selectedCategories.map((id) => ({
        key: 'category',
        value: id,
      })),
    ].forEach((item) => {
      if (item.value !== '' && item.value !== undefined) {
        params.append(`filter[${item.key}]`, String(item.value));
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  }, [
    priceRange,
    selectedCategories,
    selectedRating,
    router,
    pathname,
    searchParams,
  ]);

  useEffect(() => {
    if (!hasUserInteracted) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      updateFiltersInUrl();
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [updateFiltersInUrl, hasUserInteracted]);

  useEffect(() => {
    setPriceRange([
      Number(searchParams.get('filter[min_price]')) || 1,
      Number(searchParams.get('filter[max_price]')) || 1500,
    ]);

    setSelectedRating(searchParams.get('filter[rate]') || '');
    setSelectedCategories(searchParams.getAll('filter[category]'));
  }, [searchParams]);

  return (
    <div className="bg-white h-fit space-y-6">
      <button className="cursor-pointer w-fit flex items-center gap-4 font-semibold bg-primary text-white rounded-full px-7 h-[45px]">
        Filters
        <SlidersHorizontal size={24} />
      </button>

      <div>
        <button
          onClick={() => toggleSection('categories')}
          className="flex justify-between w-full font-semibold mb-4"
        >
          All Categories
          {expandedSections.categories ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSections.categories && (
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-3">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  checkBoxType="circle"
                  onCheckedChange={(checked) => {
                    setHasUserInteracted(true);
                    setSelectedCategories((prev) =>
                      checked
                        ? [...prev, category.id]
                        : prev.filter((c) => c !== category.id)
                    );
                  }}
                />
                <label htmlFor={category.id} className="cursor-pointer flex-1">
                  {category.name}{' '}
                  <span className="text-gray-500">({category.count})</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-y border-gray-100 py-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex justify-between w-full font-semibold mb-4"
        >
          Price
          {expandedSections.price ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSections.price && (
          <>
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                setHasUserInteracted(true);
                setPriceRange(value as [number, number]);
              }}
              min={1}
              max={1500}
              step={10}
            />
            <div className="mt-2 text-sm">
              {currencyFormated(priceRange[0])} —{' '}
              {currencyFormated(priceRange[1])}
            </div>
          </>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="flex justify-between w-full font-semibold mb-4"
        >
          Rating
          {expandedSections.rating ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-3">
            {ratings.map((rating, index) => (
              <div key={rating.value} className="flex items-center space-x-3">
                <Checkbox
                  id={rating.value}
                  checked={selectedRating === rating.value}
                  onCheckedChange={(checked) => {
                    setHasUserInteracted(true);
                    setSelectedRating(checked ? rating.value : '');
                  }}
                />
                <label className="flex items-center space-x-2 cursor-pointer">
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
