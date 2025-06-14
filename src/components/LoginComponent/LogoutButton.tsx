import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const LogoutButton = () => {
  const { logout, isLoading, error, userInfo } = useContext(AuthContext);

  return (
    <button onClick={() => logout(userInfo)}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};
