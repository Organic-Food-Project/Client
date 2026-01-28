'use client';
import { useActionState, useState } from 'react';
import { Input } from '@/components/ui/input';
import { SignupAction } from '@/lib/actions/SignupAction';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [state, action, loading] = useActionState(SignupAction, { errors: {} });
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (state.success) {
    router.push('/account/login');
  }
  return (
    <form action={action}>
      <Input
        Label="Email"
        labelClassName="sr-only"
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        value={formData.email}
        error={state?.errors?.email}
        className="mb-3 h-[49px]"
      />
      <Input
        Label="First Name"
        labelClassName="sr-only"
        id="firstName"
        name="firstName"
        placeholder="First Name"
        type="string"
        onChange={handleChange}
        value={formData.firstName}
        error={state?.errors?.firstName}
        className="mb-4 h-[49px]"
      />
      <Input
        Label="Last Name"
        labelClassName="sr-only"
        id="lastName"
        name="lastName"
        placeholder="Last Name"
        type="string"
        onChange={handleChange}
        value={formData.lastName}
        error={state?.errors?.lastName}
        className="mb-4 h-[49px]"
      />
      <Input
        Label="Password"
        labelClassName="sr-only"
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={formData.password}
        error={state?.errors?.password}
        className="mb-4 h-[49px]"
      />
      <Input
        Label="Confirm Password"
        labelClassName="sr-only"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        onChange={handleChange}
        value={formData.confirmPassword}
        error={state?.errors?.confirmPassword}
        className="mb-4 h-[49px]"
      />
      <div className="flex items-center gap-2 mb-5 text-gray-600 text-body-small">
        <input id="terms" name="terms" type="checkbox" className="w-4 h-4" />
        <label htmlFor="terms" className="text-gray-600 text-body-small">
          Accept all terms & Conditions
        </label>
      </div>
      <Button
        loading={loading}
        disabled={loading}
        type="submit"
        className="w-full"
      >
        Create Account
      </Button>
      {!loading && (
        <p className="text-body-small my-2 text-danger">
          {state?.errors?.form}
        </p>
      )}
    </form>
  );
};

export default Form;

