/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { z } from 'zod';
import Mutation from '@/lib/Mutation';

const profileSchema = z.object({
  first_name: z.string().min(1, 'Required'),
  last_name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
});

const billingSchema = z.object({
  billing_first_name: z.string().min(1, 'Required'),
  billing_last_name: z.string().min(1, 'Required'),
  company_name: z.string().optional(),
  street: z.string(),
  country: z.string(),
  state: z.string(),
  zip: z.string(),
  billing_email: z.string().email('Invalid email'),
  billing_phone: z.string(),
});

const passwordSchema = z.object({
  current_password: z.string().min(6, 'Required'),
  new_password: z.string().min(6, 'Required'),
  confirm_password: z.string().min(6, 'Required'),
});

function parseForm(schema: any, formData: FormData) {
  const values: Record<string, any> = {};

  schema._def.shape().forEach((_val: any, key: string) => {
    values[key] = formData.get(key);
  });

  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue: any) => {
      errors[issue.path[0] as string] = issue.message;
    });
    return { errors };
  }

  return { data: parsed.data };
}

export async function updateProfileAction(prev: any, formData: FormData) {
  const parsed = parseForm(profileSchema, formData);
  if (parsed.errors) return { errors: parsed.errors };

  const { error } = await Mutation({
    api: 'v1/user/profile',
    method: 'POST',
    body: parsed.data,
  });

  if (error) return { errors: { form: error } };
  return { success: true };
}

export async function updateBillingAddressAction(
  prev: any,
  formData: FormData
) {
  const parsed = parseForm(billingSchema, formData);
  if (parsed.errors) return { errors: parsed.errors };

  const { error } = await Mutation({
    api: 'v1/user/billing', // <- غير الـ endpoint
    method: 'POST',
    body: parsed.data,
  });

  if (error) return { errors: { form: error } };
  return { success: true };
}

export async function changePasswordAction(prev: any, formData: FormData) {
  const parsed = parseForm(passwordSchema, formData);
  if (parsed.errors) return { errors: parsed.errors };

  if (parsed.data.new_password !== parsed.data.confirm_password) {
    return { errors: { confirm_password: 'Passwords do not match' } };
  }

  const { error } = await Mutation({
    api: 'v1/user/change-password',
    method: 'POST',
    body: parsed.data,
  });

  if (error) return { errors: { form: error } };
  return { success: true };
}

export async function uploadProfileImageAction(prev: any, formData: FormData) {
  const file = formData.get('image') as File;
console.log({ file });
  if (!file) {
    return { errors: { form: 'No image uploaded' } };
  }

  const Form = new FormData();
  Form.append('profileImage', file);

  const { error } = await Mutation({
    api: 'v1/users/updateImage',
    method: 'PUT',
    body: Form,
  });

  if (error) return { errors: { form: error } };
  return { success: true };
}
