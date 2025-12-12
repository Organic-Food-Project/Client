import React from 'react';
import type { Metadata } from 'next';
import ProfileSettings from './components/ProfileSettings';
import PasswordSettings from './components/PasswordSettings';
import Query from '@/lib/Query';

export const metadata: Metadata = {
  title: {
    default: 'Settings',
    template: '%s | EcoFila',
  },
  description:
    'Manage your account settings, update your profile, and customize your shopping experience on EcoFila.',
};

const Settings = async () => {
  const userData = await Query({
    api: 'v1/users',
  });
  console.log({ userData: userData?.data?.data });

  return (
    <div className="space-y-8">
      <ProfileSettings data={userData?.data?.data} />
      <PasswordSettings />
    </div>
  );
};

export default Settings;
