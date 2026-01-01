'use client';

import { useState, useEffect } from 'react';
import Telephone from '@/assets/icons/Telephone.svg';
import User from '@/assets/icons/User.svg';
import Heart from '@/assets/icons/Heart.svg';
import Logo from '@/assets/Logo.png';
import Cart from '@/assets/icons/Cart.svg';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import ActiveLink from './ui/ActiveLink';
import SearchComponent from './SearchComponent';
import { Suspense } from 'react';
import CustomLink from './CustomLink';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // منع الـ scroll لما الـ menu مفتوح
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 mainPadding py-6 flex justify-between bg-white font-500 z-50 shadow-md">
        {/* Desktop Navigation Links */}
        <ul className="max-lg3:hidden flex items-center text-gray-500 text-body-medium gap-7">
          <li className="flex items-center hover:text-gray-900">
            <ActiveLink href="/" exact>
              Home
            </ActiveLink>
          </li>
          <li className="flex items-center hover:text-gray-900">
            <ActiveLink href="/shop">Shop</ActiveLink>
          </li>
          <li className="flex items-center hover:text-gray-900">
            <ActiveLink href="/about-us" exact>
              About Us
            </ActiveLink>
          </li>
        </ul>

        {/* Logo */}
        <div>
          <CustomLink href="/">
            <Image src={Logo} alt="EcoFila Logo" width={183} height={38} />
          </CustomLink>
        </div>

        {/* Desktop Right Icons */}
        <ul className="flex items-center text-gray-900 gap-5">
          <li className="max-sm:hidden max-lg3:hidden flex items-center pr-5 gap-2">
            <a
              href="tel:1234567890"
              className="flex items-center gap-4 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Image src={Telephone} alt="Phone" width={30} height={30} />
              <span className="text-lg">(123) 456-7890</span>
            </a>
          </li>
          <li className="max-sm:hidden flex items-center">
            <Suspense>
              <SearchComponent />
            </Suspense>
          </li>
          <li className="max-md:hidden">
            <CustomLink href="/wishlist">
              <Image src={Heart} alt="Heart" width={32} height={32} />
            </CustomLink>
          </li>
          <li className="max-md:hidden">
            <CustomLink href="/cart">
              <Image src={Cart} alt="Cart" width={32} height={32} />
            </CustomLink>
          </li>
          <li className="max-sm:hidden">
            <CustomLink href="/account/dashboard">
              <Image src={User} alt="User" width={32} height={32} />
            </CustomLink>
          </li>
          <li className="lg3:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Menu"
              className="hover:text-gray-600 transition-colors relative z-[700]"
            >
              {isMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </li>
        </ul>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[500] lg3:hidden ${
          isMenuOpen
            ? 'opacity-50 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[95%] sm:w-[450px] bg-white shadow-2xl z-[600] lg3:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center pt-6 px-6">
            <Image src={Logo} alt="EcoFila Logo" width={150} height={31} />
            <button
              onClick={toggleMenu}
              aria-label="Close Menu"
              className="cursor-pinter hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6">
            <ul className="space-y-6">
              <li>
                <ActiveLink
                  href="/"
                  exact
                  activeClassName="text-gray-900 font-semibold"
                  inactiveClassName="text-gray-700"
                >
                  <span
                    className="block text-lg hover:text-gray-900 transition-colors"
                    onClick={toggleMenu}
                  >
                    Home
                  </span>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink
                  href="/shop"
                  activeClassName="text-gray-900 font-semibold"
                  inactiveClassName="text-gray-700"
                >
                  <span
                    className="block text-lg hover:text-gray-900 transition-colors"
                    onClick={toggleMenu}
                  >
                    Shop
                  </span>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink
                  href="/about-us"
                  exact
                  activeClassName="text-gray-900 font-semibold"
                  inactiveClassName="text-gray-700"
                >
                  <span
                    className="block text-lg hover:text-gray-900 transition-colors"
                    onClick={toggleMenu}
                  >
                    About Us
                  </span>
                </ActiveLink>
              </li>
            </ul>
          </div>

          {/* Divider */}
          <div className="border-t mx-6" />

          {/* Mobile Icons */}
          <div className="p-6 space-y-6">
            {/* Search */}
            <div className="flex items-center gap-4 text-gray-700">
              <Suspense>
                <SearchComponent />
              </Suspense>
              <span className="text-lg">Search</span>
            </div>

            {/* Wishlist */}
            <CustomLink
              href="/wishlist"
              className="flex items-center gap-4 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={toggleMenu}
            >
              <Image src={Heart} alt="Wishlist" width={30} height={30} />
              <span className="text-lg">Wishlist</span>
            </CustomLink>

            {/* Cart */}
            <CustomLink
              href="/cart"
              className="flex items-center gap-4 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={toggleMenu}
            >
              <Image src={Cart} alt="Cart" width={30} height={30} />
              <span className="text-lg">Cart</span>
            </CustomLink>

            {/* User Account */}
            <CustomLink
              href="/account/dashboard"
              className="flex items-center gap-4 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={toggleMenu}
            >
              <Image src={User} alt="Account" width={30} height={30} />
              <span className="text-lg">Account</span>
            </CustomLink>

            {/* Phone */}
            <a
              href="tel:1234567890"
              className="flex items-center gap-4 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Image src={Telephone} alt="Phone" width={30} height={30} />
              <span className="text-lg">(123) 456-7890</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
