'use client';
import SingleSelect from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SortSection = ({ meta }: { meta: { total: number } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<string>(searchParams.get('sort') || '');
  const sortOptions = [
    { value: 'price', label: 'Price - (low to hight)' },
    { value: '-price', label: 'Price - (hight to low)' },
    { value: 'rate', label: 'Rating - (low to hight)' },
    { value: '-rate', label: 'Rating - (hight to low)' },
  ];

  const handleSortChange = (value: string) => {
    setSort(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setSort(searchParams.get('sort') || '');
  }, [searchParams]);
  return (
    <div className="sm:h-[45px] mb-[24px] flex justify-between items-center flex-wrap gap-2">
      <div className="text-bodu-small text-gray-500 flex items-center flex-wrap gap-2">
        <span>Sort by:</span>
        <SingleSelect
          value={sort}
          onChange={(el: string) => handleSortChange(el)}
          className="w-[250px]"
          options={sortOptions}
        />
      </div>
      <div className="text-body-medium text-gray-600">
        <span className="text-gray-900 font-bold">{meta?.total}</span> Results
        Found
      </div>
    </div>
  );
};

export default SortSection;
