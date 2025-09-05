import Telephone from '@/assets/icons/Telephone.svg';
import Search from '@/assets/icons/Search.svg';
import User from '@/assets/icons/User.svg';
import Cart from '@/assets/icons/Cart.svg';
import Heart from '@/assets/icons/Heart.svg';

import Logo from '@/assets/Logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu } from 'lucide-react';
import ActiveLink from './ActiveLink';

export default function Navbar() {
  const handleShowNav = () => {};
  const handleShowSearch = () => {};

  return (
    <nav className="mainPadding py-6 flex justify-between bg-white font-poppins font-500">
      <ul className="max-lg3:hidden flex items-center text-gray-500 text-body-medium gap-7">
        <li className="flex items-center hover:text-gray-900">
          <ActiveLink href="/" exact>
            Home
          </ActiveLink>
        </li>
        <li className="flex items-center hover:text-gray-900">
          <ActiveLink href="/shop">Shop</ActiveLink>
          <ChevronDown size={24} />
        </li>
        <li className="flex items-center hover:text-gray-900">
          <ActiveLink href="/pages">Pages</ActiveLink>
          <ChevronDown size={24} />
        </li>
        <li className="flex items-center hover:text-gray-900">
          <ActiveLink href="/Blog" exact>
            Blog
          </ActiveLink>
        </li>
        <li className="flex items-center hover:text-gray-900">
          <ActiveLink href="/about-us" exact>
            About Us
          </ActiveLink>
        </li>
      </ul>
      <div>
        <Link href="/">
          <Image src={Logo} alt="Ecobazar Logo" width={183} height={38} />
        </Link>
      </div>
      <ul className="flex items-center text-gray-900 gap-5">
        <li className="max-sm:hidden max-lg3:hidden flex items-center pr-5 gap-2">
          <Image src={Telephone} alt="Telephone" width={32} height={32} />
          (123) 456-7890
        </li>
        <li className="max-sm:hidden flex items-center">
          <Image src={Search} alt="Search" width={32} height={32} />
        </li>
        <li className="max-sm:hidden ">
          <Link href="/wishlist">
            <Image src={Heart} alt="Heart" width={32} height={32} />
          </Link>
        </li>
        <li className="max-sm:hidden ">
          <Image src={Cart} alt="Cart" width={32} height={32} />
        </li>
        <li className="max-sm:hidden ">
          <Link href="/account">
            <Image src={User} alt="User" width={32} height={32} />
          </Link>
        </li>
        <li className="lg3:hidden flex items-center">
          <button>
            <Menu />
          </button>
        </li>
      </ul>
    </nav>
  );
}
