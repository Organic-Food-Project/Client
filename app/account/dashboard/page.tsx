import React from 'react';
import LogOut from './actions';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <form action={LogOut}>
        <button type="submit" className="block bg-black text-white p-4 ">
          Log out
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
