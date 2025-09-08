import type { Metadata } from 'next';
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
  return <div>SignUp</div>;
};

export default SignUp;
