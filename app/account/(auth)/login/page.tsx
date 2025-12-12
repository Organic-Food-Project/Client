import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import LoginForm from './form';

export const metadata: Metadata = {
  title: {
    default: 'Login',
    template: '%s | EcoFila',
  },
  description:
    'Access your EcoFila profile to manage account details, track healthy grocery orders, and enjoy fresh, natural, and sustainable products. Shop organic fruits, vegetables, and eco-friendly food online with ease.',
};

const Login = () => {
  return (
    <div className="p-[24px] space-y-5">
      <h3 className="text-heading-05 font-bold text-black text-center">
        Sign In
      </h3>
      <LoginForm />
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
