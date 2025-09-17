'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const LogOut = async () => {
  const Cookies = await cookies();

  Cookies.delete('token');

  redirect('/account/login');
};

export default LogOut;
