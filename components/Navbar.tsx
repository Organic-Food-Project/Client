import Telephone from '@/assets/icons/Telephone.svg';
import Search from '@/assets/icons/Search.svg';
import User from '@/assets/icons/User.svg';
import Heart from '@/assets/icons/Heart.svg';

import Logo from '@/assets/Logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import ActiveLink from './ui/ActiveLink';
import CartComponent from './Cart';
import Query from '@/lib/Query';
import { cookies } from 'next/headers';

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const cart = token
    ? await Query({ api: 'v1/cart' })
    : { data: { data: [] }, error: null };

  return (
    <nav className="sticky top-0 mainPadding py-6 flex justify-between bg-white font-500 z-[100] shadow-md ">
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
          <ActiveLink href="/pages">Pages</ActiveLink>
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
        {!cart.error && (
          <li className="max-sm:hidden relative">
            <CartComponent cart={cart} />
          </li>
        )}
        <li className="max-sm:hidden ">
          <Link href="/account/dashboard">
            <Image src={User} alt="User" width={32} height={32} />
          </Link>
        </li>
        <li className="lg3:hidden flex items-center">
          <button aria-label="Menu">
            <Menu />
          </button>
        </li>
      </ul>
    </nav>
  );
}
