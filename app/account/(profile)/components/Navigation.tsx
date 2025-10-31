'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutGrid,
  RefreshCw,
  Heart,
  ShoppingBag,
  Settings,
  LogOut as LogOutIcon,
} from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  isFunction?: boolean;
  onClick?: () => void;
};

export function Navigation() {
  const router = useRouter();
  const activePath = usePathname();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    router.push('/account/login');
  };

  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutGrid, href: '/account/dashboard' },
    { label: 'Order History', icon: RefreshCw, href: '/account/order-history' },
    // { label: 'Wishlist', icon: Heart, href: '/account/wishlist' },
    // { label: 'Shopping Cart', icon: ShoppingBag, href: '/account/cart' },
    { label: 'Settings', icon: Settings, href: '/account/settings' },
    {
      label: 'Log-out',
      isFunction: true,
      onClick: handleLogout,
      icon: LogOutIcon,
    },
  ];

  return (
    <div className="lg:sticky top-[110] w-full rounded-xl border border-gray-100 bg-white">
      <h2 className="text-body-xl font-semibold text-foreground pb-4 pt-6 px-6">
        Navigation
      </h2>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href ? activePath?.includes(item.href) : false;

          if (item.isFunction && item.onClick) {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="cursor-pointer flex w-full items-center gap-3 py-4 px-5 text-left transition-colors hover:bg-green-50"
              >
                <Icon className="h-5 w-5 text-gray-200" />
                <span className="text-base text-gray-600">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={`flex w-full items-center gap-3 py-4 text-left transition-colors hover:bg-green-50 ${
                isActive
                  ? 'bg-green-50 border-l-4 border-l-[#20B526] px-4'
                  : 'px-5'
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? 'text-gray-900' : 'text-gray-200'
                }`}
              />
              <span
                className={`text-base ${
                  isActive ? 'text-gray-900 font-medium' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
