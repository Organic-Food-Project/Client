import { Input } from '@/components/ui/input';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Signup',
    template: '%s | Organic Food',
  },
  description:
    'Create your Organic Food account today and start enjoying fresh, healthy, and 100% natural groceries. Sign up to shop organic fruits, vegetables, and eco-friendly products delivered straight to your door.',
};

const SignUp = () => {
  return (
    <div className="p-[24px] space-y-5">
      <h3 className="text-heading-05 font-bold text-black text-center">
        Create Account
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
        <Input
          placeholder="Confirm Password"
          type="password"
          className="mb-4 h-[49px]"
        />
        <div className="flex items-center gap-2 mb-5 text-gray-600 text-body-small">
          <input id="terms" name="terms" type="checkbox" className="w-4 h-4" />
          <label htmlFor="terms" className="text-gray-600 text-body-small">
            Accept all terms & Conditions
          </label>
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-primary text-body-small font-bold text-white py-[14px] w-full rounded-full"
        >
          Create Account
        </button>
      </form>
      <div className="text-center space-x-1">
        <span className="text-gray-600 text-body-small">
          Already have account?
        </span>
        <Link
          href="/account/login"
          className="text-gray-900 text-body-small font-semibold"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
