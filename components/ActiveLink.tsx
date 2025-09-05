'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  exact?: boolean;
}

export default function ActiveLink({
  href,
  children,
  activeClassName = 'active',
  inactiveClassName = '',
  exact = false,
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href.toString());

  return (
    <Link
      href={href}
      {...props}
      className={clsx(isActive ? activeClassName : inactiveClassName)}
    >
      {children}
    </Link>
  );
}
