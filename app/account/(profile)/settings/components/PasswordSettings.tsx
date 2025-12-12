'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePasswordAction } from '@/lib/actions/UserActions';

export default function PasswordSettings() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordState, passwordAction, loadingPassword] = useActionState(
    changePasswordAction,
    { errors: {} }
  );

  useEffect(() => {
    if (passwordState.success) {
      Toast({ Message: 'Password changed!', type: 'success' });
      formRef.current?.reset();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [passwordState]);

  return (
    <div className="bg-white rounded-lg border-1 border-gray-100">
      <h2 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
        Change Password
      </h2>

      <form
        ref={formRef}
        action={passwordAction}
        className="space-y-6 px-6 py-6"
      >
        <Input
          name="currentPassword"
          type="password"
          Label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="NewPassword"
            type="password"
            Label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            name="confirmPassword"
            type="password"
            Label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {passwordState.errors?.form && (
          <p className="text-red-500 text-sm">{passwordState.errors.form}</p>
        )}

        {passwordState.errors?.confirmPassword && (
          <p className="text-red-500 text-sm">
            {passwordState.errors.confirmPassword}
          </p>
        )}

        <Button
          type="submit"
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
