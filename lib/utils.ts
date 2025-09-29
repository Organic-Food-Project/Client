import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormated = (num: number) => {
  const newFormeted = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
  return newFormeted;
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // المسافات → -
    .replace(/[^\w\-]+/g, '') // يشيل أي رموز غريبة
    .replace(/\-\-+/g, '-') // يشيل -- المتكررة
    .replace(/^-+/, '') // يشيل - من الأول
    .replace(/-+$/, ''); // يشيل - من الآخر
};
