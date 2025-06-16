import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const { login, isLoading, error } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isFormValid =
    name.trim() !== "" && email.trim() !== "" && isValidEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      await login({ name, email });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={styles.input}
          />
          <div className={styles.error}>
            {name && name.trim() === "" && "Name cannot be empty."}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
          />
          <div className={styles.error}>
            {email &&
              !isValidEmail(email) &&
              "Please enter a valid email address."}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className={styles.loginButton}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
