import { Input } from '@/components/ui/input';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Forgot Password',
    template: '%s | Organic Food',
  },
  description:
    'Reset your Organic Food account password securely. Recover access to manage your profile, track healthy grocery orders, and continue shopping fresh, natural, and sustainable products with ease.',
};

const ForgotPassword = () => {
  return (
    <div className="p-[24px] space-y-5">
      <h3 className="text-heading-05 font-bold text-black text-center">
        Reset password
      </h3>
      <form action="">
        <Input placeholder="Email" type="email" className="mb-5 h-[49px]" />
        <button
          type="submit"
          className="cursor-pointer bg-primary text-body-small font-bold text-white py-[14px] w-full rounded-full"
        >
          Reset password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
