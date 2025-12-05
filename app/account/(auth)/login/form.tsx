'use client';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoginAction } from '@/lib/actions/LoginAction';
import React, { useState } from 'react';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [state, action, loading] = useActionState(LoginAction, { errors: {} });
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (state.success) {
    router.push('/');
  }
  return (
    <form action={action}>
      <Input
        Label="Email"
        labelClassName="sr-only"
        name="email"
        id="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        value={formData.email}
        error={state?.errors?.email}
        className="mb-3 h-[49px]"
      />
      <Input
        Label="Password"
        labelClassName="sr-only"
        name="password"
        id="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={formData.password}
        error={state?.errors?.password}
        className="mb-4 h-[49px]"
      />
      <div className="flex items-center justify-between mb-5 text-gray-600 text-body-small">
        <div className="flex items-center gap-2">
          <Input
            id="remember_me"
            name="remember_me"
            onChange={handleChange}
            checked={formData.remember_me}
            type="checkbox"
            className="w-4 h-4"
            parentClassName="w-fit"
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
      <Button
        loading={loading || state.success}
        disabled={loading || state.success}
        type="submit"
        className="w-full"
      >
        Login
      </Button>
      {(!loading || !state.success) && (
        <p className="text-body-small my-2 text-danger">
          {state?.errors?.form}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
