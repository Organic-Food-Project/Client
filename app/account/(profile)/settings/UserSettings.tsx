'use client';

import ProfileSettings from './components/ProfileSettings';
import BillingSettings from './components/BillingSettings';
import PasswordSettings from './components/PasswordSettings';

export default function UserSettings() {
  return (
    <div className="space-y-8">
      <ProfileSettings />
      <BillingSettings />
      <PasswordSettings />
    </div>
  );
}
