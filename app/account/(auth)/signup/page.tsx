import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import Form from './form';
import CustomLink from '@/components/CustomLink';

export const metadata: Metadata = {
  title: {
    default: 'Signup',
    template: '%s | EcoFila',
  },
  description:
    'Create your EcoFila account today and start enjoying fresh, healthy, and 100% natural groceries. Sign up to shop organic fruits, vegetables, and eco-friendly products delivered straight to your door.',
};

const SignUp = () => {
  return (
    <div className="p-[24px] space-y-5">
      <h3 className="text-heading-05 font-bold text-black text-center">
        Create Account
      </h3>
      <Form />
      <div className="text-center space-x-1">
        <span className="text-gray-600 text-body-small">
          Already have account?
        </span>
        <CustomLink
          href="/account/login"
          className="text-gray-900 text-body-small font-semibold"
        >
          Login
        </CustomLink>
      </div>
    </div>
  );
};

export default SignUp;
