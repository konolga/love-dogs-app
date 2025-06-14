import React, { useContext } from "react";
import { LoginForm } from "./components/LoginComponent/LoginForm";
import { LogoutButton } from "./components/LoginComponent/LogoutButton";
import { AuthContext } from "./context/authContext";

export const App = () => {
  const { isAuthenticated, isLoading, error } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginForm />}
      {isAuthenticated && "<SearchComponent />"}
      {isAuthenticated && "<DogListComponent />"}
      {isAuthenticated && "<DogDetailsComponent />"}
      {!isAuthenticated && <div>Please log in to access the application.</div>}
    </div>
  );
};
