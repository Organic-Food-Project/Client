import Link from 'next/link';
import React from 'react';

const Account = () => {
  return (
    <div>
      <p>
        go to <Link href="/account/login">Login</Link>
      </p>
      <p>
        go to <Link href="/account/forgot-password">forgot-password</Link>
      </p>
      <p>
        go to <Link href="/account/signup">signup</Link>
      </p>
      <p>
        go to <Link href="/account/dashboard">Dashboard</Link>
      </p>
    </div>
  );
};

export default Account;
