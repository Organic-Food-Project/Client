'use client';
import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '@/assets/icons/Search.svg';
import Image from 'next/image';
import { Search as SearchLucide, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const SearchComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const searchValue = searchParams.get('search') || '';
    setQuery(searchValue);
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        if (!query) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/shop?search=${encodeURIComponent(query)}`);

    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex items-center justify-end">
      <button
        className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
          isOpen ? 'opacity-50' : 'opacity-100'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Search"
      >
        <Image src={SearchIcon} alt="Search" width={32} height={32} />
      </button>

      <div
        className={`
          absolute top-[140%] right-0 z-50
          w-[320px] bg-white 
          border border-gray-100 shadow-xl rounded-lg
          transform transition-all duration-200 ease-out origin-top-right
          ${
            isOpen
              ? 'scale-100 opacity-100 translate-y-0 visible'
              : 'scale-95 opacity-0 -translate-y-2 invisible'
          }
        `}
      >
        <form
          onSubmit={handleSearch}
          className="p-3 relative flex items-center"
        >
          <SearchLucide className="absolute left-6 text-gray-400" size={18} />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-gray-50 text-gray-800 text-sm rounded-md py-2.5 pl-10 pr-8 border border-transparent focus:border-green-500 focus:bg-white focus:ring-0 outline-none transition-all"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-5 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;
