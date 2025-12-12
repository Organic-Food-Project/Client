/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { z } from 'zod';
import Mutation from '@/lib/Mutation';

// Consistent ActionState type
type ActionState =
  | { errors: Record<string, string>; success?: never }
  | { success: true; errors?: never };

const profileSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  Phone_Number: z.string().optional(),
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
  currentPassword: z
    .string()
    .min(6, 'Current Password is Required and must be at least 6'),
  NewPassword: z
    .string()
    .min(6, 'New Password is Required and must be at least 6'),
  confirmPassword: z
    .string()
    .min(6, 'Confirm Password is Required and must be at least 6'),
});

function parseForm(schema: any, formData: FormData) {
  const values: Record<string, any> = {};

  const shape = schema.shape;

  Object.keys(shape).forEach((key) => {
    values[key] = formData.get(key);
  });

  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue: any) => {
      errors[issue.path[0]] = issue.message;
    });
    return { errors };
  }

  return { data: parsed.data };
}

export async function updateProfileAction(
  prev: any,
  formData: FormData
): Promise<ActionState> {
  const parsed = parseForm(profileSchema, formData);
  if (parsed.errors) return { errors: parsed.errors };

  const { error } = await Mutation({
    api: 'v1/users/updateuser',
    method: 'PUT',
    body: parsed.data,
  });

  if (error) return { errors: { form: error } };
  return { success: true };
}

export async function updateBillingAddressAction(
  prev: any,
  formData: FormData
): Promise<ActionState> {
  const parsed = parseForm(billingSchema, formData);
  if (parsed.errors) return { errors: parsed.errors };

  const { error } = await Mutation({
    api: 'v1/user',
    method: 'POST',
    body: parsed.data,
  });

  if (error) return { errors: { form: error } };
  return { success: true };
}

export async function changePasswordAction(
  prev: any,
  formData: FormData
): Promise<ActionState> {
  const parsed = parseForm(passwordSchema, formData);
  if (parsed.errors) return { errors: parsed.errors };

  if (parsed.data.NewPassword !== parsed.data.confirmPassword) {
    return { errors: { confirm_password: 'Passwords do not match' } };
  }

  const { error } = await Mutation({
    api: 'v1/users/updatepassword',
    method: 'PUT',
    body: parsed.data,
  });

  if (error) return { errors: { form: error } };
  return { success: true };
}

export async function uploadProfileImageAction(
  prev: any,
  formData: FormData
): Promise<ActionState> {
  const file = formData.get('image') as File;
  console.log('---- FormData ----');
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // Check if file exists and is actually a File object
  if (!file || !(file instanceof File) || file.size === 0) {
    return { errors: { image: 'No image uploaded' } };
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { errors: { image: 'Please upload a valid image file' } };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { errors: { image: 'Image size must be less than 5MB' } };
  }

  const Form = new FormData();
  Form.append('profileImage', file);

  const { data, error } = await Mutation({
    api: 'v1/users/updateImage',
    method: 'PUT',
    body: Form,
  });

  console.log({ data });

  if (error) return { errors: { image: error } };
  return { success: true };
}
