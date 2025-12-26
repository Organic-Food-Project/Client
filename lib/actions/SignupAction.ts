'use server';
import { z } from 'zod';
import Mutation from '@/lib/Mutation';

const formSchema = z
  .object({
    email: z.email('Invalid email'),
    firstName: z
      .string()
      .min(1, 'First name is required and at least 1 characters')
      .max(10, 'First name is required and at most 10 characters'),
    lastName: z
      .string()
      .min(1, 'Last name is required and at least 1 characters')
      .max(10, 'Last name is required and at most 10 characters'),
    password: z
      .string()
      .min(6, 'Password is required and at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password is required and at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const SignupAction = async (
  prevData: { errors?: Record<string, string>; success?: boolean },
  formData: FormData
): Promise<{ errors?: Record<string, string>; success?: boolean }> => {
  const values = {
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        errors[issue.path[0].toString()] = issue.message;
      }
    });

    return { errors };
  }

  const { error } = await Mutation({
    method: 'POST',
    api: 'v1/users/signup',
    body: parsed.data,
  });

  if (error) {
    return { errors: { form: error?.data ?? error ?? 'Something went wrong' } };
  }

  return { success: true };
};
