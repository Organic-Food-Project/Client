'use client';
import { Input } from '@/app/components/ui/input';
import Link from 'next/link';
import { LoginAction } from './actions';
import React from 'react';
import { useActionState } from 'react';
import { Button } from '@/app/components/ui/button';
import Loader from '@/app/components/ui/Loader';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [state, action, pending] = useActionState(LoginAction, { errors: {} });
  const router = useRouter();
  if (state.success) {
    router.push('/');
  }
  return (
    <form action={action}>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <Input
        name="email"
        id="email"
        placeholder="Email"
        type="email"
        error={state?.errors?.email}
        className="mb-3 h-[49px]"
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <Input
        name="password"
        id="password"
        placeholder="Password"
        type="password"
        error={state?.errors?.password}
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
      <Button disabled={pending} type="submit" className="w-full">
        {pending ? (
          <>
            loading
            <Loader />
          </>
        ) : (
          'Login'
        )}
      </Button>
      {!pending && (
        <p className="text-body-small my-2 text-danger">
          {state?.errors?.form}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
