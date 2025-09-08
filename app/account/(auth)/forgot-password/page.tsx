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
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;
