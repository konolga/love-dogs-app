import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export const LoginForm = () => {
  const { login, isLoading, error } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isFormValid = name.trim() !== '' && email.trim() !== '' && isValidEmail(email);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      if (isFormValid) {
         await login({ name, email });
      }

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {email && !isValidEmail(email) && (
        <div className="error">Please enter a valid email address.</div>
      )}
      {name && name.trim() === '' && (
        <div className="error">Name cannot be empty.</div>
      )}
      <button type="submit" disabled={isLoading || !isFormValid}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
