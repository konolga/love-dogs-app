import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import styles from './LogoutButton.module.css';


export const LogoutButton = () => {
  const { logout, isLoading, error, userInfo } = useContext(AuthContext);

  return (
    <button onClick={() => logout(userInfo)} className={styles.logoutButton}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};
