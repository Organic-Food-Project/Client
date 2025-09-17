import { Input } from '@/components/ui/input';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Login',
    template: '%s | Organic Food',
  },
  description:
    'Access your organic food profile to manage account details, track healthy grocery orders, and enjoy fresh, natural, and sustainable products. Shop organic fruits, vegetables, and eco-friendly food online with ease.',
};

const Login = () => {
  return (
    <div className="p-[24px] space-y-5">
      <h3 className="text-heading-05 font-bold text-black text-center">
        Sign In
      </h3>
      <form action="">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <Input
          id="email"
          placeholder="Email"
          type="email"
          className="mb-3 h-[49px]"
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          className="mb-4 h-[49px]"
        />
        <div className="flex items-center justify-between mb-5 text-gray-600 text-body-small">
          <div className="flex items-center gap-2">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="w-4 h-4"
            />
            <label
              htmlFor="remember_me"
              className="text-gray-600 text-body-small"
            >
              Remember me
            </label>
          </div>
          <Link href="/account/forgot-password">Forget Password?</Link>
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-primary text-body-small font-bold text-white py-[14px] w-full rounded-full"
        >
          Login
        </button>
      </form>
      <div className="text-center space-x-1">
        <span className="text-gray-600 text-body-small">
          Don’t have account?
        </span>
        <Link
          href="/account/signup"
          className="text-gray-900 text-body-small font-semibold"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
