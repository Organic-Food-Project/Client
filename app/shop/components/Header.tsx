'use client';
import SingleSelect from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Header = ({ meta }: { meta: { total: number } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get('search') || ''
  );

  const [sort, setSort] = useState<string>(searchParams.get('sort') || '');

  const sortOptions = [
    { value: 'price', label: 'Price - (low to high)' },
    { value: '-price', label: 'Price - (high to low)' },
    { value: 'rate', label: 'Rating - (low to high)' },
    { value: '-rate', label: 'Rating - (high to low)' },
  ];

  const handleSortChange = (value: string) => {
    setSort(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
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

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentUrlSearch = params.get('search') || '';
      params.set('page', '1');

      if (searchValue !== currentUrlSearch) {
        if (searchValue) {
          params.set('search', searchValue);
        } else {
          params.delete('search');
        }

        router.push(`/shop?${params.toString()}`);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, router, searchParams]);

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== searchValue) {
      setSearchValue(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="xl:h-[45px] mb-[24px] sm:flex justify-between items-center flex-wrap gap-2">
      <div className="flex max-sm:flex-col gap-4 flex-grow max-sm:pb-4">
        <div className="max-sm:w-full text-bodu-small text-gray-500 flex items-center flex-wrap gap-2">
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={cn(
              'file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-gray-100 flex h-[36px] w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-gray-100 focus-visible:ring-ring/50 focus-visible:ring-[0.5px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              'w-full sm:w-[250px]'
            )}
          />
        </div>
        <div className="max-sm:w-full text-bodu-small text-gray-500 flex items-center flex-wrap gap-2">
          <span>Sort by:</span>
          <SingleSelect
            value={sort}
            onChange={(el: string) => handleSortChange(el)}
            className="w-full sm:w-[250px]"
            options={sortOptions}
          />
        </div>
      </div>
      <div className="text-body-medium text-gray-600 text-left">
        <span className="text-gray-900 font-bold">{meta?.total || 0}</span>{' '}
        Results Found
      </div>
    </div>
  );
};

export default Header;
