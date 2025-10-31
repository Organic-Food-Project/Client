import React from 'react';
import type { Metadata } from 'next';
import UserSettings from './UserSettings';

export const metadata: Metadata = {
  title: {
    default: 'Settings',
    template: '%s | Organic Food',
  },
  description:
    'Manage your account settings, update your profile, and customize your shopping experience on Organic Food.',
};

const Settings = () => {
  return (
    <div>
      <UserSettings />
    </div>
  );
};

export default Settings;
