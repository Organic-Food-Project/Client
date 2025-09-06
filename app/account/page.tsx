import React from 'react';

const Account = () => {
  // first we await and fetch user profile
  // if user is logged in we continue
  // else we redirect to login page
  const loggedIn = true;
  if (!loggedIn) {
    return <div>Redirecting to login</div>;
  }
  return <div>Account</div>;
};

export default Account;
