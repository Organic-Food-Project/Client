import React from 'react';
import type { Metadata } from 'next';
import UserSettings from './UserSettings';

export const metadata: Metadata = {
  title: {
    default: 'Settings',
    template: '%s | EcoFila',
  },
  description:
    'Manage your account settings, update your profile, and customize your shopping experience on EcoFila.',
};

const Settings = () => {
  return <UserSettings />;
};

export default Settings;
