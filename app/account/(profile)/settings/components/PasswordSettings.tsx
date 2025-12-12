'use client';

import { useActionState, useEffect } from 'react';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePasswordAction } from '@/lib/actions/UserActions';

export default function PasswordSettings() {
  const [passwordState, passwordAction, loadingPassword] = useActionState(
    changePasswordAction,
    { errors: {} }
  );

  useEffect(() => {
    if (passwordState.success) {
      Toast({ Message: 'Password changed!', type: 'success' });
    }
  }, [passwordState.success]);

  return (
    <div className="bg-white rounded-lg border-1 border-gray-100">
      <h2 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
        Change Password
      </h2>

      <form action={passwordAction} className="space-y-6 px-6 py-6">
        <Input
          name="current_password"
          type="password"
          Label="Current Password"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="new_password"
            type="password"
            Label="New Password"
            required
          />
          <Input
            name="confirm_password"
            type="password"
            Label="Confirm Password"
            required
          />
        </div>

        <Button
          className="w-[194px]"
          loading={loadingPassword}
          disabled={loadingPassword}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
}
