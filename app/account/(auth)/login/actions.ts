/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import axios from 'axios';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password is required and at least 6 characters'),
  remember_me: z.union([z.string(), z.null()]).transform((val) => val === 'on'),
});

export const LoginAction = async (
  prevState: { errors?: Record<string, string>; success?: boolean },
  formData: FormData
): Promise<{ errors?: Record<string, string>; success?: boolean }> => {
  const values = {
    email: formData.get('email'),
    password: formData.get('password'),
    remember_me: formData.get('remember_me'),
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

  try {
    const res = await axios.post(`${process.env.BE_BASE_URL}/v1/users/login`, {
      email: parsed.data.email,
      password: parsed.data.password,
    });

    const days = parsed.data.remember_me ? 30 : 1;

    const cookieStore = await cookies();
    console.log({ res });
    cookieStore.set('token', res.data.token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * days,
    });
    return { success: true };
  } catch (err: any) {
    console.log({ err });
    return {
      errors: { form: err?.response?.data?.message ?? 'Invalid credentials' },
    };
  }
};
