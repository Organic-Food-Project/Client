import type { Metadata } from 'next';
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
  return <div>Login</div>;
};

export default Login;
