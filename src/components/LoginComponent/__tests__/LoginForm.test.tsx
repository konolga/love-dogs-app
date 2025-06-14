// src/components/LoginForm/LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { AuthContext } from '../../../context/authContext';

const mockLogin = jest.fn();

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider value={{ 
    login: mockLogin, 
    isLoading: false, 
    error: null,
    userInfo: { name: '', email: '' },
    logout: jest.fn(),
    isAuthenticated: false,
  }}>
    {children}
  </AuthContext.Provider>
);


describe('LoginForm', () => {
    it('shows error message for invalid email', () => {
        render(
          <MockAuthProvider>
            <LoginForm />
          </MockAuthProvider>
        );
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    });
  it('calls login on form submit with valid data', async () => {
    render(
      <MockAuthProvider>
        <LoginForm />
      </MockAuthProvider>
    );
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const loginButton = screen.getByText('Login');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com' });
  });

  it('disables the submit button if the form is invalid', () => {
    render(<LoginForm />);
    const loginButton = screen.getByText('Login');

    // Initially, form is invalid
    expect(loginButton).toBeDisabled();

    // Fill only name
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    expect(loginButton).toBeDisabled();

    // Fill only email (invalid)
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john' } });
    expect(loginButton).toBeDisabled();

    // Fill valid data
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    expect(loginButton).not.toBeDisabled();
  });
});
